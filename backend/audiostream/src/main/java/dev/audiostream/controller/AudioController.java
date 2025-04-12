package dev.audiostream.controller;


import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequestMapping("/audio")
public class AudioController {

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> playSong(@PathVariable String fileName,
    @RequestHeader(value = "Range", required = false) String rangeHeader) throws IOException {

        Resource file = audioService.getFileByName(fileName);

        return null;
    }
}
