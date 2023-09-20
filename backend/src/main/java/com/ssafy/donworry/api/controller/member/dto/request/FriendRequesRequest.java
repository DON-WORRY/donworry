package com.ssafy.donworry.api.controller.member.dto.request;

import java.util.List;

public record FriendRequesRequest(

        // TODO: 2023-09-20 리스트형태 validation 알아보기
        List<String> memberEmails
) {
}
