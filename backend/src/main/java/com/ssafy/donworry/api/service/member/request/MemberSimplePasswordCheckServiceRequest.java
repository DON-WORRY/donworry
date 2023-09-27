package com.ssafy.donworry.api.service.member.request;

import com.ssafy.donworry.api.controller.member.dto.request.MemberSimplePasswordCheckRequest;

public record MemberSimplePasswordCheckServiceRequest(

        String memberSimplePassword
) {

    public static MemberSimplePasswordCheckServiceRequest of(MemberSimplePasswordCheckRequest request){
        return new MemberSimplePasswordCheckServiceRequest(
                request.memberSimplePassword()
        );
    }
}
