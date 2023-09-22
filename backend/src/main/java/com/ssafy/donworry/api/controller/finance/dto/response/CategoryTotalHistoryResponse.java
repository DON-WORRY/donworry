package com.ssafy.donworry.api.controller.finance.dto.response;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CategoryTotalHistoryResponse(
        @NotNull Long total,
        @NotNull List<CategoryHistoryResponse> categoryHistoryResponseList
        ) {
}
