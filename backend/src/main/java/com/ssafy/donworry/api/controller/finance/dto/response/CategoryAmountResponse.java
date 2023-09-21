package com.ssafy.donworry.api.controller.finance.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

public record CategoryAmountResponse(

        @NotNull String category,
        @NotNull Long amount

) {

}
