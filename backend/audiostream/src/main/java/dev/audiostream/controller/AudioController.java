package dev.audiostream.controller;


import dev.audiostream.service.AudioService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/audio")
public class AudioController {

    private final AudioService audioService;

    public AudioController(AudioService audioService) {
        this.audioService = audioService;
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<InputStreamResource> playSong(@PathVariable String fileName,
                                                        @RequestHeader(value = "Range", required = false) String rangeHeader) throws IOException {

//        Resource audioFile = audioService.getFileByName(fileName);
        Resource audioFile = audioService.getGcpFileByName(fileName);
        File file = audioFile.getFile();

        long fileLength = file.length();
        long rangeStart = 0;
        long rangeEnd = fileLength - 1;

        String fileType;
        String endOfFile = fileName.toLowerCase().substring(fileName.length()-4);

        if(endOfFile.equals(".mp3")) {
            fileType = "audio/mpeg";
        }
        else if(endOfFile.equals(".wav")) {
            fileType = "audio/wav";
        }
        else {
            return ResponseEntity.badRequest().build();
        }

        if (rangeEnd >= fileLength) {
            rangeEnd = fileLength - 1;
        }

        long contentLength = rangeEnd - rangeStart + 1;
        InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
        inputStream.skip(rangeStart);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", fileType);
        headers.set("Accept-Ranges", "bytes");
        headers.set("Content-Length", String.valueOf(contentLength));
        headers.set("Content-Range", String.format("bytes %d-%d/%d", rangeStart, rangeEnd, fileLength));

        return ResponseEntity.status(rangeHeader != null ? HttpStatus.PARTIAL_CONTENT : HttpStatus.OK)
                .headers(headers)
                .body(new InputStreamResource(inputStream));

    }
}
