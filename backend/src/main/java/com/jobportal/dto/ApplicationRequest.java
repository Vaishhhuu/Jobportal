package com.jobportal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ApplicationRequest {
    @NotBlank(message = "Applicant name is required")
    private String applicantName;

    @Email(message = "Valid email is required")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String coverLetter;

    @NotBlank(message = "Resume file name is required")
    private String resumeFileName;

    // Constructors
    public ApplicationRequest() {}

    public ApplicationRequest(String applicantName, String email, String phone, String coverLetter, String resumeFileName) {
        this.applicantName = applicantName;
        this.email = email;
        this.phone = phone;
        this.coverLetter = coverLetter;
        this.resumeFileName = resumeFileName;
    }

    // Getters and Setters
    public String getApplicantName() { return applicantName; }
    public void setApplicantName(String applicantName) { this.applicantName = applicantName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }

    public String getResumeFileName() { return resumeFileName; }
    public void setResumeFileName(String resumeFileName) { this.resumeFileName = resumeFileName; }
}