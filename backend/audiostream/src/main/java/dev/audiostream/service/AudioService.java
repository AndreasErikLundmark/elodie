package dev.audiostream.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class AudioService {

    @Value("${gcp.bucket.name}")
    private String bucketName;

    public Resource getFileByName(String fileName) {
        String filePath = "audioFiles/" + fileName;
        return new ClassPathResource(filePath);

    }

    /**
     * Talks to GCP storage API that provides a Blob
     * @param fileName
     * @return
     */
    public Resource getGcpFileByName(String fileName) {
        Storage storage = StorageOptions.getDefaultInstance().getService();

        String filePath = "audioFiles/" + fileName;

        Blob blob = storage.get(bucketName, filePath);

        if (blob == null) {
            throw new IllegalArgumentException("File not found in GCS: " + filePath);
        }


        byte[] content = blob.getContent();


        InputStream inputStream = new ByteArrayInputStream(content);


        return new InputStreamResource(inputStream);

    }
}
