package com.ssafy.donworry.api.controller.finance.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

public record CategoryTotalResponse(
        @NotNull Long total,
        @NotNull CategoryTotalResponse categoryTotalResponse
) {

}
