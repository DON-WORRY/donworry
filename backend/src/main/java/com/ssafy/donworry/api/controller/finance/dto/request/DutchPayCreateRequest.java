package com.ssafy.donworry.api.controller.finance.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;

public record DutchPayCreateRequest(
        @NotNull Long id,
        @NotNull List<ReqAmountRequest> reqAmountList
) {

}
