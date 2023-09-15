package com.ssafy.donworry.api.controller.account;

import com.ssafy.donworry.api.controller.account.dto.response.CardListResponse;
import com.ssafy.donworry.api.controller.account.dto.response.ConsumptionResponse;
import com.ssafy.donworry.api.controller.account.dto.response.ConsumtionDetailResponse;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/card")
@RequiredArgsConstructor
public class CardController {


    @Operation(summary = "카드별 소비내역", description = "소지한 카드들의 카드별 소비내역을 조회하는 API입니다.")
    @GetMapping("/{user_id}")
    public ApiData<ConsumptionResponse> searchCardConsumption(@PathVariable("user_id") Long memberId) {
        log.info("searchCardConsumption - memberId : " + memberId);
        ConsumptionResponse list = null;
        return ApiData.of(list);
    }
    @Operation(summary = "상세카드 소비내역", description = "선택한 카드의 사용내역을 조회하는 API입니다.")
    @GetMapping("/detail/{id}")
    public ApiData<List<ConsumtionDetailResponse>> searchCardDetailConsumption(@PathVariable("id") Long cardId) {
        List<ConsumtionDetailResponse> list = null;
        return ApiData.of(list);
    }

    @Operation(summary = "사용자 카드 불러오기", description = "사용자가 보유한 카드를 조회하는 API입니다.")
    @GetMapping("/list/{id}")
    public ApiData<List<CardListResponse>> searchCardList(@PathVariable("id") Long memberId) {
        log.info("searchCardList - memberId : " + memberId);
        List<CardListResponse> list = null;
        return ApiData.of(list);
    }
}
