package com.jobportal.service;

import com.jobportal.entity.Job;
import com.jobportal.entity.User;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class AdminService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private ApplicationRepository applicationRepository;

    public List<User> getPendingRecruiters() {
        return userRepository.findByRoleAndStatus(User.Role.RECRUITER, User.AccountStatus.PENDING);
    }

    public List<Job> getPendingJobs() {
        return jobRepository.findByStatusOrderByPostedDateDesc(Job.JobStatus.PENDING);
    }

    public User approveRecruiter(Long recruiterId) {
        User recruiter = userRepository.findById(recruiterId)
            .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiter.setStatus(User.AccountStatus.ACTIVE);
        return userRepository.save(recruiter);
    }

    public User rejectRecruiter(Long recruiterId) {
        User recruiter = userRepository.findById(recruiterId)
            .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiter.setStatus(User.AccountStatus.INACTIVE);
        return userRepository.save(recruiter);
    }

    public Job approveJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));
        job.setStatus(Job.JobStatus.APPROVED);
        return jobRepository.save(job);
    }

    public Job rejectJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));
        job.setStatus(Job.JobStatus.REJECTED);
        return jobRepository.save(job);
    }

    public Map<String, Long> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalJobs", jobRepository.count());
        stats.put("totalApplications", applicationRepository.count());
        stats.put("pendingRecruiters", (long) getPendingRecruiters().size());
        stats.put("pendingJobs", (long) getPendingJobs().size());
        return stats;
    }
}