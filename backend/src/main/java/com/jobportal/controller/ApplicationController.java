package com.jobportal.controller;

import com.jobportal.dto.ApplicationRequest;
import com.jobportal.entity.Application;
import com.jobportal.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {
    
    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/job/{jobId}")
    public ResponseEntity<?> submitApplication(@PathVariable Long jobId,
                                             @RequestParam Long userId,
                                             @Valid @RequestBody ApplicationRequest request) {
        try {
            Application application = applicationService.submitApplication(jobId, userId, request);
            return ResponseEntity.ok().body("{\"message\": \"Application submitted successfully\"}");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"Application submission failed\"}");
        }
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJobId(@PathVariable Long jobId) {
        try {
            List<Application> applications = applicationService.getApplicationsByJobId(jobId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getUserApplications(@PathVariable Long userId) {
        try {
            List<Application> applications = applicationService.getUserApplications(userId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}