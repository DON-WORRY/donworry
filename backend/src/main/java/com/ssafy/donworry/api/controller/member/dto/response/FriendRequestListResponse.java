package com.ssafy.donworry.api.controller.member.dto.response;

import java.util.List;

public record FriendRequestListResponse(
        List<FriendRequestResponse> receivedRequest,
        List<FriendRequestResponse> sendRequest
) {

    public static FriendRequestListResponse of(List<FriendRequestResponse> receivedRequest, List<FriendRequestResponse> sendRequest){
        return new FriendRequestListResponse(
                receivedRequest,
                sendRequest
        );
    }
}
