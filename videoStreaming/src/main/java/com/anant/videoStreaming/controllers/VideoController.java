package com.anant.videoStreaming.controllers;

import com.anant.videoStreaming.models.Video;
import com.anant.videoStreaming.services.S3Service;
import com.anant.videoStreaming.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.utils.IoUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/videos")
public class VideoController {
    @Autowired
    private VideoService videoService;

    @Autowired
    private S3Service s3Service;

    @GetMapping
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable Long id) {
        Video video = videoService.getVideoById(id);
        return video != null ? ResponseEntity.ok(video) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Video> uploadVideo(@RequestParam("file") MultipartFile file,
                                             @RequestParam("title") String title,
                                             @RequestParam("description") String description) {
        try {
            String url = s3Service.uploadFile(file);
            Video video = new Video();
            video.setTitle(title);
            video.setDescription(description);
            video.setUrl(url);
            Video savedVideo = videoService.saveVideo(video);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedVideo);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

//    @GetMapping("/stream/{key}")
//    public ResponseEntity<byte[]> streamVideo(@PathVariable String key) {
//        try {
//            InputStream videoStream = s3Service.getVideoStream(key);
//            byte[] videoBytes = IoUtils.toByteArray(videoStream);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//            headers.setContentLength(videoBytes.length);
//
//            return new ResponseEntity<>(videoBytes, headers, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/list")
    public List<String> listVideos() {
        return s3Service.listAllVideos();
    }

    @GetMapping("/stream/{filename:.+}")
    public ResponseEntity<InputStreamResource> streamVideo(@PathVariable String filename) throws IOException {
        InputStream videoStream = s3Service.downloadFile(filename);
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(new InputStreamResource(videoStream));
    }
}
