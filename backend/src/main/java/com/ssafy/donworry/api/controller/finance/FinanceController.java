package com.ssafy.donworry.api.controller.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.TransferAccountRequest;
import com.ssafy.donworry.api.service.finance.FinanceService;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class FinanceController {
    private final FinanceService financeService;
    @Operation(summary = "계좌번호를 통한 송금", description = "계좌Id와 계좌번호를 받아 송금하는 API입니다.")
    @PostMapping("/transfer")
    public ApiData<Long> transferByAccount(@AuthenticationPrincipal UserDetailsModel userDetailsModel,
                                           @RequestBody TransferAccountRequest transferAccountRequest) {
        Long memberId = userDetailsModel.getId();
        Long result = financeService.transferByAccount(memberId, transferAccountRequest);
        return ApiData.of(result);
    }

}
