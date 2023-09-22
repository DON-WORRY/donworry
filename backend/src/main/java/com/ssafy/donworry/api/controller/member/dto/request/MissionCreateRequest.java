package com.ssafy.donworry.api.controller.member.dto.request;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public record MissionCreateRequest(

        Long goalAmount,
        LocalDate goalStartTime
) {
}
