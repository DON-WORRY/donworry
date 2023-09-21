package com.ssafy.donworry.api.controller.finance.dto.response;

import com.ssafy.donworry.domain.finance.entity.Consumption;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class CategoryHistoryResponse {
    Long id;
    String detail;
    String bankName;
    Long price;
    LocalDateTime dateTime;

    @Builder
    public CategoryHistoryResponse(Long id, String detail, String bankName, Long price, LocalDateTime dateTime) {
        this.id = id;
        this.detail = detail;
        this.bankName = bankName;
        this.price = price;
        this.dateTime = dateTime;
        // TODO: 2023-09-21 dataTime -> 소비날짜 변수명으로 변경
    }

    public void updatePrice(Long incomePrice) {
        this.price -= incomePrice;
    }
}
