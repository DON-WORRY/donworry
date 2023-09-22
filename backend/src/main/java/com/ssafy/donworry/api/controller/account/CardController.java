package com.ssafy.donworry.api.controller.account;

import com.ssafy.donworry.api.controller.account.dto.response.CardInfoResponse;
import com.ssafy.donworry.api.controller.account.dto.response.ConsumptionResponse;
import com.ssafy.donworry.api.controller.account.dto.response.ConsumtionDetailResponse;
import com.ssafy.donworry.api.service.account.CardService;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    private final CardService cardService;

    @Operation(summary = "모든 카드 소비토탈금액", description = "소지한 카드들의 카드별 월 소비내역과 해당 월의 카드소비총액을 조회하는 API입니다.")
    @GetMapping("/{month}")
    public ApiData<ConsumptionResponse> searchCardConsumption(@AuthenticationPrincipal UserDetailsModel userDetailsModel, @PathVariable("month") Long month) {
        Long memberId = userDetailsModel.getId();
        log.info("searchCardConsumption - memberId : " + memberId);
        ConsumptionResponse consumptionResponse = cardService.findEachCardConsumption(memberId, month);
        return ApiData.of(consumptionResponse);
    }
    @Operation(summary = "해당 월의 상세카드 소비내역", description = "선택한 카드의 선택한 월 사용내역을 조회하는 API입니다.")
    @GetMapping("/detail/{card_id}/{month}")
    public ApiData<List<ConsumtionDetailResponse>> searchCardDetailConsumption(@PathVariable("card_id") Long cardId, @PathVariable("month") Long month) {

        List<ConsumtionDetailResponse> list = cardService.findEachCardOfMonthDetailConsumption(cardId, month);
        return ApiData.of(list);
    }

    @Operation(summary = "사용자 카드 불러오기", description = "사용자가 보유한 카드를 조회하는 API입니다.")
    @GetMapping("/list")
    public ApiData<List<CardInfoResponse>> searchCardList(@AuthenticationPrincipal UserDetailsModel userDetailsModel) {
        Long memberId = userDetailsModel.getId();
        log.info("searchCardList - memberId : " + memberId);
        List<CardInfoResponse> cardInfoResponses = cardService.findCardInfoList(memberId);
        return ApiData.of(cardInfoResponses);
    }
}
