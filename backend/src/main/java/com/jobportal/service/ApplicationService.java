package com.jobportal.service;

import com.jobportal.dto.ApplicationRequest;
import com.jobportal.entity.Application;
import com.jobportal.entity.Job;
import com.jobportal.entity.User;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    
    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private UserRepository userRepository;

    public Application submitApplication(Long jobId, Long userId, ApplicationRequest request) {
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Application application = new Application(
            request.getApplicantName(),
            request.getEmail(),
            request.getPhone(),
            request.getCoverLetter(),
            request.getResumeFileName(),
            job,
            user
        );
        
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobIdOrderByAppliedDateDesc(jobId);
    }

    public List<Application> getUserApplications(Long userId) {
        return applicationRepository.findByUserIdOrderByAppliedDateDesc(userId);
    }
}