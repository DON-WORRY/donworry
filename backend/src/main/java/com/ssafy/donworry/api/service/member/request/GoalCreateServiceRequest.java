package com.ssafy.donworry.api.service.member.request;

import com.ssafy.donworry.api.controller.member.dto.request.GoalCreateRequest;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record GoalCreateServiceRequest(

        Long memberId,
        Long goalAmount,
        LocalDate goalStartTime,
        LocalDate goalEndTime

) {

    public static GoalCreateServiceRequest of(Long memberId, GoalCreateRequest request){
        return new GoalCreateServiceRequest(
                memberId,
                request.goalAmount(),
                request.goalStartTime(),
                request.goalEndTime()
        );
    }
}
