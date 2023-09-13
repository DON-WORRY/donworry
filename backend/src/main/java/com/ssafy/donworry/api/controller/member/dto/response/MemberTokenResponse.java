package com.ssafy.donworry.api.controller.member.dto.response;

import com.ssafy.donworry.common.model.JwtCreateModel;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;

public record MemberTokenResponse(
        String accessToken,

        String refreshToken,

        Long id,

        String name,

        String email,

        MemberRole memberRole
) {

    public static MemberTokenResponse of(String accessToken, String refreshToken, JwtCreateModel model){
        return new MemberTokenResponse(
                accessToken,
                refreshToken,
                model.getId(),
                model.getName(),
                model.getEmail(),
                model.getMemberRole()
        );
    }
}
