package com.ssafy.donworry.api.service.finance.query;

import com.querydsl.core.Tuple;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryAmountResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryTotalResponse;
import com.ssafy.donworry.common.response.ApiError;
import com.ssafy.donworry.domain.finance.repository.query.ConsumptionQueryRepository;
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
    public CategoryTotalResponse searchCategoryTotal(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        if(findMember.isEmpty()) {
            return null;
            // TODO: 2023-09-17 (017) 예외 처리
        }
        List<Tuple> list = consumptionQueryRepository.findTotalByMemberId(memberId);
//        CategoryAmountResponse categoryAmount = new
        String s = list.get(0).get(0, String.class);
        log.info("스트링 : " + s);
        for(Tuple t: list) {
            log.info("카테고리 : " + t.get(0, Long.class));
            log.info("합계 : " + t.get(1, Long.class));
        }

        return null;

    }
}
