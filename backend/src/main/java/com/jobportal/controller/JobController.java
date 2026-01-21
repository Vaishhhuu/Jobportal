package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.entity.User;
import com.jobportal.service.JobService;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {
    
    @Autowired
    private JobService jobService;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        try {
            List<Job> jobs = jobService.getAllJobs();
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        try {
            Optional<Job> job = jobService.getJobById(id);
            return job.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Job>> searchJobs(@RequestParam String keyword) {
        try {
            if (keyword == null || keyword.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            List<Job> jobs = jobService.searchJobs(keyword.trim());
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job, @RequestParam Long recruiterId) {
        try {
            System.out.println("Creating job for recruiter ID: " + recruiterId);
            System.out.println("Job data: " + job.getTitle());
            
            // Validate application deadline
            if (job.getApplicationDeadline() != null && job.getApplicationDeadline().isBefore(java.time.LocalDate.now())) {
                return ResponseEntity.badRequest().body("{\"error\": \"Application deadline cannot be in the past\"}");
            }
            
            // Find the actual recruiter from database
            User recruiter = userRepository.findById(recruiterId)
                .orElseThrow(() -> new RuntimeException("Recruiter not found with ID: " + recruiterId));
            
            System.out.println("Found recruiter: " + recruiter.getFullName());
            
            job.setRecruiter(recruiter);
            job.setStatus(Job.JobStatus.PENDING);
            job.setPostedDate(java.time.LocalDate.now());
            
            Job savedJob = jobService.saveJob(job);
            System.out.println("Job saved successfully with ID: " + savedJob.getId());
            
            return ResponseEntity.ok(savedJob);
        } catch (Exception e) {
            System.err.println("Error creating job: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<List<Job>> getRecruiterJobs(@PathVariable Long recruiterId) {
        try {
            List<Job> jobs = jobService.getRecruiterJobs(recruiterId);
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}