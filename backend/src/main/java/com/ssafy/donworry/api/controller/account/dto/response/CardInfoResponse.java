package com.ssafy.donworry.api.controller.account.dto.response;

public record CardInfoResponse(
        Long cardId,
        String cardCompanyName,
        String cardNumber
) {
    public static CardInfoResponse of(Long cardId, String cardCompanyName, String cardNumber){
        return new CardInfoResponse(cardId, cardCompanyName, cardNumber);
    }
}
