package com.ssafy.donworry.api.controller.member.dto.response;

import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record FriendRequestResponse(

        @NotNull
        Long memberId,

        @NotNull
        String memberEmail,

        @NotNull
        String memberName,

        @NotNull
        LocalDateTime createdTime
) {

    public static FriendRequestResponse of(Member member){
        return new FriendRequestResponse(
                member.getId(),
                member.getMemberEmail(),
                member.getMemberName(),
                member.getCreatedTime()
        );
    }
}
