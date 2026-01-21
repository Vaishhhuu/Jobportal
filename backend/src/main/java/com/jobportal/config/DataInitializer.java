package com.jobportal.config;

import com.jobportal.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private JobService jobService;

    @Override
    public void run(String... args) throws Exception {
        jobService.initializeData();
    }
}