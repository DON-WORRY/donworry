package com.ssafy.donworry.api.service.member.request;

import com.ssafy.donworry.api.controller.member.dto.request.FriendRequesRequest;

import java.util.List;

public record FriendRequestServiceRequest(

        List<String> memberEmails
) {

    public static FriendRequestServiceRequest of(FriendRequesRequest request){
        return new FriendRequestServiceRequest(
                request.memberEmails()
        );
    }
}
