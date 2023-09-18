package com.ssafy.donworry.api.service.member.request;

import com.ssafy.donworry.api.controller.member.dto.request.EmailCheckAuthCodeRequest;

public record EmailCheckAuthCodeServiceRequest(

        String email,

        String authCode
) {

    public static EmailCheckAuthCodeServiceRequest of(EmailCheckAuthCodeRequest request){
        return new EmailCheckAuthCodeServiceRequest(
                request.email(),
                request.authCode()
        );
    }
}
