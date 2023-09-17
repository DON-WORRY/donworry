package com.ssafy.donworry.api.controller.finance.dto.response;

import com.ssafy.donworry.domain.finance.entity.Consumption;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

public record CategoryHistoryResponse(
        @NotNull Long id,
        @NotNull String detail,
        @NotNull String bankName,
        @NotNull Long price,
        @NotNull LocalDateTime dateTime
) {
//    public CategoryHistoryResponse(Consumption consumption) {
//
//    }
}
