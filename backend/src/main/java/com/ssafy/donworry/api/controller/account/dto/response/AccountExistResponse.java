package com.ssafy.donworry.api.controller.account.dto.response;

public record AccountExistResponse(
        boolean isAccount,
        String name
) {
}
