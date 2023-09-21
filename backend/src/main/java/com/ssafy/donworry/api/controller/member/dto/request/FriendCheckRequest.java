package com.ssafy.donworry.api.controller.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;


public record FriendCheckRequest(

        @NotNull
        Long friendRequestId,

        @NotNull
        Long friendId,

        @NotNull
        @JsonProperty("isAccept")
        boolean isAccept
) {
}
