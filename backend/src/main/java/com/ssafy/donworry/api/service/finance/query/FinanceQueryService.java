package com.ssafy.donworry.api.service.finance.query;

import com.querydsl.core.Tuple;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryAmountResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryTotalResponse;
import com.ssafy.donworry.common.response.ApiError;
import com.ssafy.donworry.domain.finance.repository.query.ConsumptionQueryRepository;
import com.ssafy.donworry.domain.finance.repository.query.IncomeQueryRepository;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FinanceQueryService {
    private final MemberRepository memberRepository;
    private final ConsumptionQueryRepository consumptionQueryRepository;
    private final IncomeQueryRepository incomeQueryRepository;

    public CategoryTotalResponse searchCategoryTotal(Long memberId) {
        List<Tuple> consumptionList = consumptionQueryRepository.findConsumptionByMemberId(memberId);
        // 1. 소비 데이터 가져오기
//        List<Tuple> incomeList = incomeQueryRepository.findIncomeByMemberId(memberId);

        // 2. 더치페이 아이디가 있는 소득 카테고리별로 정리 된 데이터 가져오기
        // ( 데이터 가져올 때 존재유무 상관없이 모든 카테고리 별 금액 가져오기 )
        // 3. 카테고리 별로 소비 - 소득 계산
        // 4. 소비 내역 정렬
        // 5. 총합 계산 후 dto 생성
//        CategoryAmountResponse categoryAmount = new
        String s = consumptionList.get(0).get(0, String.class);
        log.info("스트링 : " + s);
        for(Tuple t: consumptionList) {
            log.info("카테고리 : " + t.get(0, Long.class));
            log.info("합계 : " + t.get(1, Long.class));
        }

        return null;

    }
}
