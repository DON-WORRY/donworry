package com.ssafy.donworry.api.controller.member.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.donworry.domain.member.entity.Goal;

import java.time.LocalDateTime;

public record GoalDetailResponse(

        Long goalId,
        Long goalAmount,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        LocalDateTime goalStartTime,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        LocalDateTime goalEndTime
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
