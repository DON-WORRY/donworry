package com.ssafy.donworry.api.service.member.request;

import com.ssafy.donworry.api.controller.member.dto.request.MemberLoginRequest;

public record MemberLoginServiceRequest(

        String memberEmail,

        String memberPassword
) {

    public static MemberLoginServiceRequest of(MemberLoginRequest request){
        return new MemberLoginServiceRequest(
                request.memberEmail(),
                request.memberPassword()
        );
    }
}
