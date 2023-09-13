package com.ssafy.donworry.api.controller.finance.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

public record ReqAmountRequest(
        @NotNull Long memberId,
        @NotNull Long amount
) {
}
