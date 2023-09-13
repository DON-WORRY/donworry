package com.ssafy.donworry.api.controller.member.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

public record EmailCheckAuthCodeRequest(

        @Email
        @NotNull
        String email,

        @NotNull
        String authCode
) {

}
