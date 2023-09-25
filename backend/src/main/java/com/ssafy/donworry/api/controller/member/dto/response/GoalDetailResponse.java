package com.ssafy.donworry.api.controller.member.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.donworry.domain.member.entity.Goal;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record GoalDetailResponse(

        Long goalId,
        Long goalAmount,
        LocalDate goalStartTime,
        LocalDate goalEndTime
) {

    public static GoalDetailResponse of(Goal goal){
        return new GoalDetailResponse(
                goal.getId(),
                goal.getGoalAmount(),
                goal.getGoalStartTime(),
                goal.getGoalEndTime()
        );
    }
}
