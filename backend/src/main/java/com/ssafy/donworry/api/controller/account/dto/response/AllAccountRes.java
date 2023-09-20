package com.ssafy.donworry.api.controller.account.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class AllAccountRes {
    Long memberId;
    Long accountId;
    Long remainedAmount;
    LocalDateTime createTime;

    @Builder
    public AllAccountRes(Long memberId, Long accountId, Long remainedAmount, LocalDateTime createTime) {
        this.memberId = memberId;
        this.accountId = accountId;
        this.remainedAmount = remainedAmount;
        this.createTime = createTime;
    }
}
