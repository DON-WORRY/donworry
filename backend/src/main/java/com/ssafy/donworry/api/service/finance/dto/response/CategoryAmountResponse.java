package com.ssafy.donworry.api.service.finance.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class CategoryAmountResponse {
    private String food;
    private String transport;
    private String life;
    private String hobby;
    private String style;
    private String etc;
}
