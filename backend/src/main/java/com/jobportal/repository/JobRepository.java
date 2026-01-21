package com.jobportal.repository;

import com.jobportal.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    @Query("SELECT j FROM Job j WHERE j.status = 'APPROVED' AND (" +
           "LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY j.postedDate DESC")
    List<Job> findByKeyword(@Param("keyword") String keyword);
    
    List<Job> findByStatusOrderByPostedDateDesc(Job.JobStatus status);
    List<Job> findByRecruiterIdOrderByPostedDateDesc(Long recruiterId);
    List<Job> findAllByOrderByPostedDateDesc();
}