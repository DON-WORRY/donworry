package com.ssafy.donworry.api.controller.finance;

public record FriendRankResponse(
        Long rank
) {
    public static FriendRankResponse of(Long rank){
        return new FriendRankResponse(rank);
    }
}
