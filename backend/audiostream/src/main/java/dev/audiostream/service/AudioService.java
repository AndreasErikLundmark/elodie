package dev.audiostream.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;


@Service
public class AudioService {

    @Value("${gcp.bucket.name}")
    private String bucketName;

    @Value("${gcp.public.bucket}")
    private String publicBucketUrl = "https://storage.googleapis.com/elodie-audiofiles-2025/";

    public Resource getFileByName(String fileName) {
        String filePath = "audioFiles/" + fileName;
        return new ClassPathResource(filePath);
    }

    /**
     * Fetches puclic stream from GCP bucket
     *
     * @param fileName
     * @return
     */
    public Resource getGcpFileByName(String fileName) throws MalformedURLException {
        try {
            UrlResource urlResource = new UrlResource(publicBucketUrl + fileName);
            if (!urlResource.exists()) {
                return null;
            }
            return urlResource;
        } catch (MalformedURLException e) {
            throw new MalformedURLException("Invalid file URL for: " + fileName);
        }
    }

}
