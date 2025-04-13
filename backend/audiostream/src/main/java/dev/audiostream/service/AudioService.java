package dev.audiostream.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

@Service
public class AudioService {

    public Resource getFileByName(String fileName) {
        String filePath = "audioFiles/" + fileName;
        return new ClassPathResource(filePath);

    }
}
