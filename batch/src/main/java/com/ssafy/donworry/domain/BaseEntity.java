package com.ssafy.donworry.domain;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @NotNull
    @CreatedDate
    private LocalDateTime createdTime;

    @NotNull
    @LastModifiedDate
    private LocalDateTime modifiedTime;

    public void update(LocalDateTime createdTime, LocalDateTime modifiedTime){
        this.createdTime = createdTime;
        this.modifiedTime = modifiedTime;
    }
}
