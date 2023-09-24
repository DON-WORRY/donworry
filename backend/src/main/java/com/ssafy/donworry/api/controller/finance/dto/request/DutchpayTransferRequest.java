package com.ssafy.donworry.api.controller.finance.dto.request;

public record DutchpayTransferRequest(
        Long detailDutchpayId,
        Long sendPrice,
        String simplePassword

) {
}
