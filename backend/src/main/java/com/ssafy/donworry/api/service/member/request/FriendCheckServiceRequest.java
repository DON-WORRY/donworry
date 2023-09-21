package com.ssafy.donworry.api.service.member.request;

import com.ssafy.donworry.api.controller.member.dto.request.FriendCheckRequest;

public record FriendCheckServiceRequest(

        Long friendRequestId,

        Long friendId,

        boolean isAccept
) {

    public static FriendCheckServiceRequest of(FriendCheckRequest request){
        return new FriendCheckServiceRequest(
                request.friendRequestId(),
                request.friendId(),
                request.isAccept()
        );
    }
}
