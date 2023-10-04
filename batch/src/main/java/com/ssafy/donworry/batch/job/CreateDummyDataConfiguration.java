package com.ssafy.donworry.batch.job;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class CreateDummyDataConfiguration {

    @Bean
    public Job job(JobRepository jobRepository, Step step){
        return new JobBuilder("dummyJob", jobRepository)
                .start(step)
                .build();
    }

    @Bean


}
