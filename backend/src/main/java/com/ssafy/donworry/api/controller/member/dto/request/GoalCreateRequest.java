package com.ssafy.donworry.api.controller.member.dto.request;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record GoalCreateRequest(

        @NotNull
        Long goalAmount,

        @NotNull
        LocalDate goalStartTime,

        @NotNull
        LocalDate goalEndTime
) {
}
