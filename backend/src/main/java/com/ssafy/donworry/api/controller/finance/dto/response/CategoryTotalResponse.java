package com.ssafy.donworry.api.controller.finance.dto.response;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CategoryTotalResponse(
        @NotNull Long total,
        @NotNull List<CategoryAmountResponse> categoryAmountList
) {

}
