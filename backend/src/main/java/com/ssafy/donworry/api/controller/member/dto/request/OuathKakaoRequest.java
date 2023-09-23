package com.ssafy.donworry.api.controller.member.dto.request;

import jakarta.validation.constraints.NotNull;

public record OuathKakaoRequest(

        @NotNull
        String kakaoAuthToken
) {
}
