package com.ssafy.donworry.api.controller.member.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record GoalCreateRequest(

        @NotNull
        Long goalAmount,

        @NotNull
        LocalDateTime goalStartTime,

        @NotNull
        LocalDateTime goalEndTime
) {
}
