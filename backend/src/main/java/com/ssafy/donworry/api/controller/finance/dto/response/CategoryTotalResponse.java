package com.ssafy.donworry.api.controller.finance.dto.response;

import jakarta.validation.constraints.NotNull;

public record CategoryTotalResponse(
        @NotNull Long total,
        @NotNull CategoryAmountResponse categoryAmountResponse
) {

}
