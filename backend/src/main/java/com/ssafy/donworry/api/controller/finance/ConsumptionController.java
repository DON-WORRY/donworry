package com.ssafy.donworry.api.controller.finance;

import com.ssafy.donworry.api.controller.finance.requestdto.CategoryModifyRequest;
import com.ssafy.donworry.api.service.finance.dto.response.CategoryHistoryResponse;
import com.ssafy.donworry.api.service.finance.dto.response.CategoryTotalResponse;
import com.ssafy.donworry.common.api.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/consumption")
@RequiredArgsConstructor
public class ConsumptionController {

    @Operation(summary = "카테고리별 소비합계 조회", description = "각 카테고리별 소비합계를 조회하는 API입니다.")
    @GetMapping("/total/{id}")
    public ApiResult<CategoryTotalResponse> searchCategoryTotal(@PathVariable("id") Long memberId) {
        log.info("searchCategoryTotal - memberId : " + memberId);

        return null;
    }

    @Operation(summary = "카테고리별 소비내역 조회", description = "각 카테고리별 소비내역을 조회하는 API입니다.")
    @GetMapping("/history/{id}")
    public ApiResult<List<CategoryHistoryResponse>> searchCategoryHistory(@PathVariable("id") Long memberId) {
        log.info("searchCategoryHistory - memberId : " + memberId);

        return null;
    }

    @Operation(summary = "거래내역의 카테고리 변경", description = "해당 소비내역의 소비카테고리를 변경하는 API입니다.")
    @PutMapping("/modify")
    public ApiResult<Long> modifyCategory(@RequestBody CategoryModifyRequest categoryModifyRequest) {
        log.info("modifyCategory : " + categoryModifyRequest.getConsumptionId());

        return null;
    }


}
