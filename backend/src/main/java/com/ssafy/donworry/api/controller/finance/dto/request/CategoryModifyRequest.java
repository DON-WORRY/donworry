package com.ssafy.donworry.api.controller.finance.dto.request;

import com.ssafy.donworry.domain.finance.entity.Consumption;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

public record CategoryModifyRequest(
        @NotNull Long consumptionId,
        @NotNull Long consumptionCategoryId
) {
}
