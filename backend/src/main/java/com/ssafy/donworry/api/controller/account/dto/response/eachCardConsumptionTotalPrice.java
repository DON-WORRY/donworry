package com.ssafy.donworry.api.controller.account.dto.response;

public record eachCardConsumptionTotalPrice(
        Long cardId,
        String cardCompanyName,
        Long cardConsumptionTotalPrice
        ) {
}
