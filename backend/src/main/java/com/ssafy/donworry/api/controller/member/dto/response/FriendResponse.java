package com.ssafy.donworry.api.controller.member.dto.response;

import com.ssafy.donworry.domain.member.entity.Member;

public record FriendResponse(

        Long friendId,

        String friendName,

        String friendEmail
) {

    public static FriendResponse of(Member member){
        return new FriendResponse(
                member.getId(),
                member.getMemberName(),
                member.getMemberEmail()
        );
    }
}
