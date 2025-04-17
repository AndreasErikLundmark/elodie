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
    public ResponseEntity<Resource> playSong(@PathVariable String fileName,
                                             @RequestHeader(value = "Range", required = false) String rangeHeader) throws IOException {

        Resource audioFile = audioService.getGcpFileByName(fileName);
        String fileType = determineFileType(fileName);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", fileType);

        InputStream inputStream = audioFile.getInputStream();


        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
        if (inputStreamResource != null) {

            return ResponseEntity.status(rangeHeader != null ? HttpStatus.PARTIAL_CONTENT : HttpStatus.OK)
                    .headers(headers)
                    .body(inputStreamResource);
        }
        return ResponseEntity.notFound().build();
    }

    private String determineFileType(String fileName) {
        String fileType;
        String endOfFile = fileName.toLowerCase().substring(fileName.length() - 4);

        if (endOfFile.equals(".mp3")) {
            fileType = "audio/mpeg";
        } else if (endOfFile.equals(".wav")) {
            fileType = "audio/wav";
        } else {
            fileType = "application/octet-stream";  // Default fallback for unsupported types
        }
        return fileType;
    }


}
