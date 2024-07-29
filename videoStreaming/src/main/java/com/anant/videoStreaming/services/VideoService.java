package com.anant.videoStreaming.services;

import com.anant.videoStreaming.models.Video;
import com.anant.videoStreaming.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {
    @Autowired
    private VideoRepository videoRepository;

    public List<Video> getAllVideos(){
        return videoRepository.findAll();
    }

    public Video getVideoById(Long id){
        return videoRepository.findById(id).orElse(null);
    }

    public Video saveVideo(Video video){
        return videoRepository.save(video);
    }

    public void deleteVideo(Long id){
        videoRepository.deleteById(id);
    }
}
