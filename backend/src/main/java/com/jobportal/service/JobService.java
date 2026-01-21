package com.jobportal.service;

import com.jobportal.entity.Job;
import com.jobportal.entity.User;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findByStatusOrderByPostedDateDesc(Job.JobStatus.APPROVED);
    }

    public List<Job> getRecruiterJobs(Long recruiterId) {
        return jobRepository.findByRecruiterIdOrderByPostedDateDesc(recruiterId);
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public List<Job> searchJobs(String keyword) {
        return jobRepository.findByKeyword(keyword);
    }

    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    public void initializeData() {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User("Admin User", "admin@jobportal.com", "admin123", User.Role.ADMIN);
            admin.setStatus(User.AccountStatus.ACTIVE);
            userRepository.save(admin);
            
            // Create sample recruiter
            User recruiter = new User("Tech Recruiter", "recruiter@techcorp.com", "recruiter123", User.Role.RECRUITER);
            recruiter.setStatus(User.AccountStatus.ACTIVE);
            userRepository.save(recruiter);
            
            // Create sample user
            User jobSeeker = new User("John Doe", "john@example.com", "user123", User.Role.USER);
            jobSeeker.setStatus(User.AccountStatus.ACTIVE);
            userRepository.save(jobSeeker);
            
            // Create approved jobs
            List<Job> sampleJobs = Arrays.asList(
                createSampleJob("Software Engineer", "TechCorp Inc", "San Francisco, CA", "Full-time", 
                        "We are looking for a skilled Software Engineer to join our dynamic team. You will work with modern technologies and collaborate with cross-functional teams.",
                        Arrays.asList("Java", "Spring Boot", "React", "MySQL"), 
                        "$80,000 - $120,000", recruiter),
                
                createSampleJob("Frontend Developer", "WebSolutions LLC", "New York, NY", "Full-time",
                        "Join our frontend team to create amazing user experiences. Work with React, TypeScript, and modern CSS frameworks.",
                        Arrays.asList("React", "JavaScript", "CSS", "HTML", "TypeScript"), 
                        "$70,000 - $100,000", recruiter),
                        
                createSampleJob("Data Analyst", "DataInsights Corp", "Chicago, IL", "Full-time",
                        "Analyze complex datasets to provide actionable insights for business decisions. Experience with Python and SQL required.",
                        Arrays.asList("Python", "SQL", "Tableau", "Excel"), 
                        "$60,000 - $85,000", recruiter),
                        
                createSampleJob("DevOps Engineer", "CloudTech Solutions", "Austin, TX", "Full-time",
                        "Manage and optimize our cloud infrastructure. Implement CI/CD pipelines and ensure system reliability.",
                        Arrays.asList("AWS", "Docker", "Kubernetes", "Jenkins"), 
                        "$90,000 - $130,000", recruiter),
                        
                createSampleJob("UX Designer", "DesignStudio Pro", "Seattle, WA", "Contract",
                        "Create intuitive and engaging user experiences for web and mobile applications. Collaborate with product teams.",
                        Arrays.asList("Figma", "Adobe XD", "Sketch", "Prototyping"), 
                        "$65,000 - $95,000", recruiter)
            );
            
            jobRepository.saveAll(sampleJobs);
        }
    }
    
    private Job createSampleJob(String title, String company, String location, String type, 
                               String description, List<String> skills, String salaryRange, User recruiter) {
        Job job = new Job();
        job.setTitle(title);
        job.setCompany(company);
        job.setLocation(location);
        job.setType(type);
        job.setPostedDate(LocalDate.now());
        job.setDescription(description);
        job.setSkills(skills);
        job.setSalaryRange(salaryRange);
        job.setApplicationDeadline(LocalDate.now().plusDays(30));
        job.setRecruiter(recruiter);
        job.setStatus(Job.JobStatus.APPROVED);
        return job;
    }
}