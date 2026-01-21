package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.entity.User;
import com.jobportal.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    
    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/recruiters/pending")
    public ResponseEntity<List<User>> getPendingRecruiters() {
        return ResponseEntity.ok(adminService.getPendingRecruiters());
    }

    @GetMapping("/jobs/pending")
    public ResponseEntity<List<Job>> getPendingJobs() {
        return ResponseEntity.ok(adminService.getPendingJobs());
    }

    @PutMapping("/recruiters/{id}/approve")
    public ResponseEntity<User> approveRecruiter(@PathVariable Long id) {
        try {
            User recruiter = adminService.approveRecruiter(id);
            return ResponseEntity.ok(recruiter);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/recruiters/{id}/reject")
    public ResponseEntity<User> rejectRecruiter(@PathVariable Long id) {
        try {
            User recruiter = adminService.rejectRecruiter(id);
            return ResponseEntity.ok(recruiter);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/jobs/{id}/approve")
    public ResponseEntity<Job> approveJob(@PathVariable Long id) {
        try {
            Job job = adminService.approveJob(id);
            return ResponseEntity.ok(job);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/jobs/{id}/reject")
    public ResponseEntity<Job> rejectJob(@PathVariable Long id) {
        try {
            Job job = adminService.rejectJob(id);
            return ResponseEntity.ok(job);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}