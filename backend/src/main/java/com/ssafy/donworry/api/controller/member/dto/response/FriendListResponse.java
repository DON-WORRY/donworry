package com.ssafy.donworry.api.controller.member.dto.response;

import java.util.List;

public record FriendListResponse(

     List<FriendResponse> friendResponseList
) {

    public static FriendListResponse of(List<FriendResponse> friendResponses){
        return new FriendListResponse(
                friendResponses
        );
    }
}
