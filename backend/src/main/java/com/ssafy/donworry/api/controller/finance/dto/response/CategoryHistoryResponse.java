package com.ssafy.donworry.api.controller.finance.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class CategoryHistoryResponse {
    private Long id;
    private String detail;
    private String bankName;
    private Long amount;
    private LocalDateTime dateTime;
}
