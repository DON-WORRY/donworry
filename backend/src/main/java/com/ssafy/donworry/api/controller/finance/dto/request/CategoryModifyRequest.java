package com.ssafy.donworry.api.controller.finance.dto.request;

import jakarta.validation.constraints.NotNull;

public record CategoryModifyRequest(
        @NotNull Long consumptionId,
        @NotNull Long consumptionCategoryId
) {
}
