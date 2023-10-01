package com.ssafy.donworry.api.controller.finance.dto.response;

import jakarta.validation.constraints.NotNull;

public record CategoryAmountResponse(
        @NotNull Long categoryId,

        @NotNull String category,
        @NotNull Long amount

) {

}
