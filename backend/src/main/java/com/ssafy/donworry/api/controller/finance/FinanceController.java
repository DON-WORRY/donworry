package com.ssafy.donworry.api.controller.finance;

import com.ssafy.donworry.api.service.finance.dto.response.CategoryTotalResponse;
import com.ssafy.donworry.common.api.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class FinanceController {

    @Operation(summary = "소비내역 총액 조회", description = "")
    @GetMapping("/total/{id}")
    public ApiResult<CategoryTotalResponse> searchCategoryTotal(@PathVariable("id") Long memberId) {

        return null;
    }

}
