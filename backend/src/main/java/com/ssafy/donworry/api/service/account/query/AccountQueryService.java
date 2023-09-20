package com.ssafy.donworry.api.service.account.query;

import com.ssafy.donworry.api.controller.account.dto.response.*;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.repository.query.AccountQueryRepository;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.Income;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import com.ssafy.donworry.domain.finance.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountQueryService {
    private final AccountQueryRepository accountQueryRepository;
    private final ConsumptionRepository consumptionRepository;
    private final IncomeRepository incomeRepository;
    public AccountAllResponse searchAccountList(Long memberId) {
        List<Account> list = accountQueryRepository.findByMemberId(memberId);

        AtomicLong total = new AtomicLong(0L);


        List<AccountSummaryResponse> accountSummaryResponses  = list.stream()
                .map(
                        account -> {
                            total.addAndGet(account.getAccountAmount());
                            return AccountSummaryResponse.of(account);
                        })
                .collect(Collectors.toList());

        return AccountAllResponse.of(total.get(), accountSummaryResponses);
    }


    public AccountHistoryResponse searchAccountDetailList(Long accountId) {
        List<Consumption> consumptions = consumptionRepository.findByAccountId(accountId);
        List<Income> incomes = incomeRepository.findByAccountId(accountId);

        List<AccountConsumptionDetailResponse> accountConsumptionDetailResponses = Stream.concat(
                consumptions.stream().map(AccountConsumptionDetailResponse::of),
                incomes.stream().map(AccountConsumptionDetailResponse::of)
        ).collect(Collectors.toList());

        accountConsumptionDetailResponses.sort(Comparator.comparing(AccountConsumptionDetailResponse::getCreateTime));


        return AccountHistoryResponse.of(accountConsumptionDetailResponses);
    }

    public List<StatisticsResponse> searchStatisticsResponseList(Long memberId) {
        List<StatisticsResponse> fullMonthConsumption;
        List<StatisticsResponse> fullMonthIncome ;
        List<StatisticsResponse> result = new ArrayList<>();
        LocalDate date = LocalDate.now();
        for(int month = 11; month >= 0; month--){
            fullMonthConsumption = accountQueryRepository.findStatisticsOfConsumption(memberId, date.minusMonths(month));
            fullMonthIncome = accountQueryRepository.findStatisticsOfInCome(memberId, date.minusMonths(month));
            Long totalConsumption = 0L;
            Long totalIncome = 0L;
            for(int i = 0; i < fullMonthConsumption.size(); i++) {
                totalConsumption += fullMonthConsumption.get(i).accountAmount();
            }
            for(int i = 0; i < fullMonthIncome.size(); i++){
                totalIncome += fullMonthIncome.get(i).accountAmount();
            }
            Long value = totalConsumption > totalIncome ? totalConsumption : totalIncome;
            if(value == 0L && month != 11) value = result.get(10-month).accountAmount();
            result.add(StatisticsResponse.of(null,
                    LocalDate.of(date.minusMonths(month).getYear(), date.minusMonths(month).getMonth(), date.minusMonths(month).getDayOfMonth())
                    ,value));

        }


        for(int i = 0; i < result.size(); i++){
            System.out.println(result.get(i).toString());
        }
        return null;
    }
}
