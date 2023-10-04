package com.ssafy.donworry.api.controller.finance.dto.response;

import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CategoryHistoryResponse {
    Long id;
    String detail;
    String bankName;
    Long price;
    LocalDateTime dateTime;
    DutchpayStatus dutchpayStatus;
    Long categoryId;

    @Builder
    public CategoryHistoryResponse(Long id, String detail, String bankName, Long price, LocalDateTime dateTime, DutchpayStatus dutchpayStatus, Long categoryId) {
        this.id = id;
        this.detail = detail;
        this.bankName = bankName;
        this.price = price;
        this.dateTime = dateTime;
        this.dutchpayStatus = dutchpayStatus;
        this.categoryId = categoryId;
    }




    public void updatePrice(Long incomePrice) {
        this.price -= incomePrice;
    }
}
