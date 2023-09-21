package com.ssafy.donworry.api.controller.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.CategoryModifyRequest;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryAmountResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryHistoryResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryTotalResponse;
import com.ssafy.donworry.api.service.finance.FinanceService;
import com.ssafy.donworry.api.service.finance.query.FinanceQueryService;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/consumption")
@RequiredArgsConstructor
public class ConsumptionController {
    private final FinanceQueryService financeQueryService;
    private final FinanceService financeService;

    @Operation(summary = "카테고리별 소비합계 조회", description = "각 카테고리별 소비합계를 조회하는 API입니다.")
    @GetMapping("/total")
    public ApiData<CategoryTotalResponse> searchCategoryTotal(@AuthenticationPrincipal UserDetailsModel userDetailsModel, @RequestParam int month) {
        Long memberId = userDetailsModel.getId();
        log.info("searchCategoryTotal - memberId : " + memberId);
        CategoryTotalResponse categoryTotal = financeQueryService.searchCategoryTotal(memberId, month);
        return ApiData.of(categoryTotal);
    }


    @Operation(summary = "카테고리별 소비내역 조회", description = "각 카테고리별 소비내역을 조회하는 API입니다.")
    @GetMapping("/history/{id}")
    public ApiData<List<CategoryHistoryResponse>> searchCategoryHistory(@AuthenticationPrincipal UserDetailsModel userDetailsModel,
                                                                        @PathVariable("id") Long categoryId,
                                                                        @RequestParam int month) {
        Long memberId = userDetailsModel.getId();
        log.info("searchCategoryHistory - memberId : " + memberId);

        List<CategoryHistoryResponse> historyResponseList = financeQueryService.searchCategoryHistory(memberId, categoryId, month);
//        for (Long i = 1l; i <= 3; i++) {
//            CategoryHistoryResponse categoryHistoryResponse = new CategoryHistoryResponse(i, "신쭈꾸미 수완점", "KB국민은행", i, LocalDateTime.now());
//            historyResponseList.add(categoryHistoryResponse);
//        }

        return ApiData.of(historyResponseList);
    }

    @Operation(summary = "거래내역의 카테고리 변경", description = "해당 소비내역의 소비카테고리를 변경하는 API입니다.")
    @PutMapping("/modify")
    public ApiData<Long> modifyCategory(@RequestBody CategoryModifyRequest categoryModifyRequest) {

        Long consumptionId = categoryModifyRequest.consumptionId();
        Long categoryId = categoryModifyRequest.consumptionCategoryId();

        Long id = financeService.modifyCategory(consumptionId, categoryId);
        log.info("modifyCategory : " + id);

        return ApiData.of(id);
    }


}
