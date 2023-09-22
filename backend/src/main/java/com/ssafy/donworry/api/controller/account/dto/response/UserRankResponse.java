package com.ssafy.donworry.api.controller.account.dto.response;

public record UserRankResponse(Long userAmount) {
    public static UserRankResponse of(Long userAmount){
        return new UserRankResponse(userAmount);
    }
}
