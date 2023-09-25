package com.ssafy.donworry.api.controller.finance.dto.request;

public record TransferAccountRequest(
        Long accountId,
        String accountNumber,
        Long price,
        String simplePassword

) {
}
