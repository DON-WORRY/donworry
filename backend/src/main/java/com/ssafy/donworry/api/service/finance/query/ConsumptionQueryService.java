package com.ssafy.donworry.api.service.finance.query;

import com.querydsl.core.Tuple;
import com.ssafy.donworry.api.controller.account.dto.response.AccountAllResponse;
import com.ssafy.donworry.api.controller.finance.FriendRankResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryAmountResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryHistoryResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryTotalResponse;
import com.ssafy.donworry.api.controller.member.dto.response.FriendListResponse;
import com.ssafy.donworry.api.service.account.query.AccountQueryService;
import com.ssafy.donworry.api.service.member.query.FriendQueryService;
import com.ssafy.donworry.common.response.ApiError;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.repository.query.ConsumptionQueryRepository;
import com.ssafy.donworry.domain.finance.repository.query.IncomeQueryRepository;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ConsumptionQueryService {
    private final MemberRepository memberRepository;
    private final ConsumptionQueryRepository consumptionQueryRepository;
    private final IncomeQueryRepository incomeQueryRepository;
    private final FriendQueryService friendQueryService;
    private final AccountQueryService accountQueryService;

    public CategoryTotalResponse searchCategoryTotal(Long memberId, int month) {
        // 1. 소비 데이터 가져오기
        List<Tuple> consumptionList = consumptionQueryRepository.findConsumptionCategoryTotal(memberId, month);
//        for(Tuple t: consumptionList) {
//            log.info("카테고리 : " + t.get(0, Long.class));
//            log.info("합계 : " + t.get(1, Long.class));
//        }

        // 2. 더치페이 아이디가 있는 소득 카테고리별로 정리 된 데이터 가져오기
        List<Tuple> incomeList = incomeQueryRepository.findIncomeCategoryTotal(memberId, month);
        // ["식비", 1000], ["교통", 2000] ...
//        for(Tuple t: incomeList) {
//            log.info("카테고리 : " + t.get(0, Long.class));
//            log.info("합계 : " + t.get(1, Long.class));
//        }

        // 3. 카테고리 별로 소비 - 소득 계산
        List<CategoryAmountResponse> categoryAmountList = createCategoryAmountList(consumptionList, incomeList);
//        for (CategoryAmountResponse categoryAmountResponse : categoryAmountList) {
//            log.info("Name : {}, Amount : {}", categoryAmountResponse.category(), categoryAmountResponse.amount());
//        }

        // 4. 소비 내역 정렬
        Collections.sort(categoryAmountList, (o1, o2) -> Math.toIntExact(o2.amount() - o1.amount()));
        for (CategoryAmountResponse categoryAmountResponse : categoryAmountList) {
            log.info("Name : {}, Amount : {}", categoryAmountResponse.category(), categoryAmountResponse.amount());
        }

        // 5. 총합 계산 후 dto 생성
        Long total = createTotal(categoryAmountList);
        String name = memberRepository.findById(memberId).get().getMemberName();
        return new CategoryTotalResponse(total, name, categoryAmountList);
    }

    public List<CategoryHistoryResponse> searchCategoryHistory(Long memberId, Long categoryId, int month) {

        // 유저 소비내역 불러오기
        List<CategoryHistoryResponse> categoryHistoryList = consumptionQueryRepository.findConsumptionCategoryHistory(memberId, categoryId, month);
//        for(CategoryHistoryResponse categoryHistory : categoryHistoryList) {
//            log.info("id : {}, detail : {}, price : {}", categoryHistory.id(), categoryHistory.detail(), categoryHistory.price());
//        }

        // 유저 더치페이가 된 소득내역 불러오기
        List<Tuple> incomeList = incomeQueryRepository.findIncomeDutchpayPriceByMemberId(memberId, categoryId, month);


        for(Tuple t : incomeList) {
            log.info("id : {}, price : {}", t.get(0, Long.class), t.get(1, Long.class));
        }
        for(Tuple t : incomeList) {
            for(CategoryHistoryResponse ch : categoryHistoryList) {
                if(t.get(0, Long.class).equals(ch.getId())) {
                    ch.updatePrice(t.get(1, Long.class));
                    break;
                }
            }
        }

        // 계산된 소비내역 시간 순으로 정렬
        Collections.sort(categoryHistoryList, (o1, o2) -> o2.getDateTime().compareTo(o1.getDateTime()));
        return new ArrayList<>(categoryHistoryList);
    }


    /**
     * 비즈니스 로직
      */

    private Long createTotal(List<CategoryAmountResponse> categoryAmountList) {
        Long total = 0l;
        for (CategoryAmountResponse categoryAmountResponse : categoryAmountList) {
            total += categoryAmountResponse.amount();
        }
        return total;
    }

    private List<CategoryAmountResponse> createCategoryAmountList(List<Tuple> consumptionList, List<Tuple> incomeList) {
        List<String> category = List.of("교통", "생활", "식비", "쇼핑", "여가", "기타");
        boolean[] check = new boolean[6];
        List<CategoryAmountResponse> categoryAmountList = new ArrayList<>();

        for (Tuple consumption : consumptionList) {
            boolean flag = true;
            Long categoryId = consumption.get(0, Long.class);
            String categoryName = consumption.get(1, String.class);
            Long categoryAmount = consumption.get(2, Long.class);
            for (Tuple income : incomeList) {
                if (income.get(0, String.class).equals(categoryName)) {
                    categoryAmountList.add(new CategoryAmountResponse(categoryId, categoryName, categoryAmount - income.get(1, Long.class)));
                    flag = false;
                    break;
                }
            }
            if (flag) {
                categoryAmountList.add(new CategoryAmountResponse(categoryId, categoryName, categoryAmount));
            }
            check[category.indexOf(categoryName)] = true;
        }

        for (int i = 0; i < category.size(); i++) {
            if (!check[i]) {
                categoryAmountList.add(new CategoryAmountResponse((long)i, category.get(i), 0l));
            }
        }
        return categoryAmountList;
    }

    public FriendRankResponse findUserRank(Long memberId) {
        log.debug("ConsumptionQueryServer -> findUserRank -> memberId : " + memberId);
        // 친구 리스트 불러오기
        FriendListResponse friendListResponse = friendQueryService.searchFriend(memberId);
        List<Long> friendEachTotalPrice = new ArrayList<>();
        Long memberTotalPrice = accountQueryService.searchAccountList(memberId).total();
        Long friendId = null;

        for(int i = 0; i < friendListResponse.friendResponseList().size(); i++){
            friendId = friendListResponse.friendResponseList().get(i).friendId();
            AccountAllResponse accountAllResponse = accountQueryService.searchAccountList(friendId);
            if(memberTotalPrice < accountAllResponse.total())friendEachTotalPrice.add(accountAllResponse.total());
        }
        // 친구 리스트 기반
        return FriendRankResponse.of((long) (friendEachTotalPrice.size()+1));
    }
}
