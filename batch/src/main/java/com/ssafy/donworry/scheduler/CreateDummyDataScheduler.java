package com.ssafy.donworry.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class CreateDummyDataScheduler {

    private final Job job;
    private final JobLauncher jobLauncher;

    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul")
    public void executeCreateDummyData(){
        Random random = new Random();
        // 1부터 10,000 사이의 난수 생성
        long randomHolding = random.nextInt(300) + 100L * 1000;
        System.out.println("start scheduling");
        try {
            jobLauncher.run(
                    job,
                    new JobParametersBuilder()
                            .addString("datetime", LocalDateTime.now().toString() + randomHolding)
                            .toJobParameters()
            );
        } catch (JobExecutionException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }

    }


//    @Scheduled(fixedRate = 1000000000, initialDelay = 5000)
//    public void executeCreateDummyData(){
//        Random random = new Random();
//        // 1부터 10,000 사이의 난수 생성
//        long randomHolding = random.nextInt(300) + 100L * 1000;
//        System.out.println("start scheduling");
//        try {
//            jobLauncher.run(
//                    job,
//                    new JobParametersBuilder()
//                            .addString("datetime", LocalDateTime.now().toString() + randomHolding)
//                            .toJobParameters()
//            );
//        } catch (JobExecutionException ex) {
//            System.out.println(ex.getMessage());
//            ex.printStackTrace();
//        }
//
//    }


}
