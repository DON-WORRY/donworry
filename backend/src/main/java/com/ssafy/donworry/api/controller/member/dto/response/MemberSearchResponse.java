package com.ssafy.donworry.api.controller.member.dto.response;

import com.ssafy.donworry.domain.member.entity.Member;

public record MemberSearchResponse(

        String memberName,

        String memberEmail
) {

    public static MemberSearchResponse of(Member member){
        return new MemberSearchResponse(
                member.getMemberName(),
                member.getMemberEmail()
        );
    }
}
