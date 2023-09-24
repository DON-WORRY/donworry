package com.ssafy.donworry.api.controller.member.dto.request;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

public record GoalCreateRequest(

        @NotNull
        Long goalAmount,

        @NotNull
        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime goalStartTime,

        @NotNull
        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime goalEndTime
) {
}
