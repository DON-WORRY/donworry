package com.ssafy.donworry.api.controller.member.dto.response;

import com.ssafy.donworry.common.model.JwtCreateModel;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record MemberLoginResponse(

        @NotNull
        String accessToken,

        @NotNull
        String refreshToken,

        @NotNull
        Long memberId,

        @NotNull
        String memberName,

        @NotNull
        String memberEmail,

        @NotNull
        LocalDate memberBirthDate,

        @NotNull
        MemberRole memberRole

) {

    public static MemberLoginResponse of(String accessToken, String refreshToken, JwtCreateModel model){
        return new MemberLoginResponse(
                accessToken,
                refreshToken,
                model.getId(),
                model.getName(),
                model.getEmail(),
                model.getBirthDate(),
                model.getMemberRole()
        );
    }

}
