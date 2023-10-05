package com.ssafy.donworry.batch.job;

import com.ssafy.donworry.batch.chunk.AccountItemWriter;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.service.AccountService;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.adapter.ItemWriterAdapter;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class CreateDummyDataConfiguration {

    private final AccountItemWriter accountItemWriter;
    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public Job job(JobRepository jobRepository, PlatformTransactionManager transactionManager){
        return new JobBuilder("job", jobRepository)
                .start(step(jobRepository, transactionManager))
//                .incrementer(new RunIdIncrementer())
                .build();
    }

    @Bean
    public Step step(JobRepository jobRepository, PlatformTransactionManager transactionManager){
        return new StepBuilder("step", jobRepository)
                .<Member, Member>chunk(100, transactionManager)
                .reader(customItemReader())
                .writer(accountItemWriter)
//                .taskExecutor(taskExecutor())
                .build();
    }

    @Bean
    public ItemReader<? extends Member> customItemReader(){

        return new JpaPagingItemReaderBuilder<Member>()
                .name("itemReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(100)
                .queryString("select m from Member m")
                .build();
    }

//    @Bean
//    public TaskExecutor taskExecutor(){
//        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
//        executor.setCorePoolSize(4);
//        executor.setMaxPoolSize(8);
//        executor.setThreadNamePrefix("safety-thread");
//        return executor;
//    }

}
