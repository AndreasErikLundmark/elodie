package dev.audiostream.controller;


import dev.audiostream.service.AudioService;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

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

        Resource audioFile = audioService.getFileByName(fileName);
        File file = audioFile.getFile();

        long fileLength = file.length();
        long rangeStart = 0;
        long rangeEnd = fileLength - 1;

        String fileType;
        String endOfFile = fileName.toLowerCase().substring(fileName.length()-3);

        if(endOfFile.equals("mp3")) {
            fileType = "audio/mpeg";
        }
        else if(endOfFile.equals("wav")) {
            fileType = "audio/wav";
        }
        else {
            return ResponseEntity.badRequest().build();
        }
        return null;
    }
}
