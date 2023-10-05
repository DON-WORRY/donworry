package com.ssafy.donworry.service;

import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.entity.Bank;
import com.ssafy.donworry.domain.account.entity.Card;
import com.ssafy.donworry.domain.account.entity.CardCompany;
import com.ssafy.donworry.domain.account.entity.enums.CardStatus;
import com.ssafy.donworry.domain.account.entity.enums.CardType;
import com.ssafy.donworry.domain.account.repository.AccountRepository;
import com.ssafy.donworry.domain.account.repository.BankRepository;
import com.ssafy.donworry.domain.account.repository.CardCompanyRepository;
import com.ssafy.donworry.domain.account.repository.CardRepository;
import com.ssafy.donworry.domain.account.repository.query.AccountQueryRepository;
import com.ssafy.donworry.domain.account.repository.query.CardQueryRepository;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.ConsumptionCategory;
import com.ssafy.donworry.domain.finance.entity.Income;
import com.ssafy.donworry.domain.finance.repository.ConsumptionCategoryRepository;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import com.ssafy.donworry.domain.finance.repository.IncomeRepository;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.ssafy.donworry.util.StoreDataUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;

import static com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus.NOTSTART;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {

    private final StoreDataUtil storeDataUtil;
    private final IncomeRepository incomeRepository;
    private final AccountRepository accountRepository;
    private final ConsumptionRepository consumptionRepository;
    private final ConsumptionCategoryRepository consumptionCategoryRepository;

    // TODO: 2023-10-06 logger 사용하기 시간이 너무 없었어 ㅜㅜ 
    
    public void createMemberConsumption(Member member) {
        System.out.println(member.toString());
        List<Account> accounts = member.getAccounts();
        System.out.println("11111111111111");
        for (Account account : accounts) {

            LocalDateTime nowTime = LocalDateTime.now();
            LocalDateTime yesterday = LocalDateTime.now().minusDays(14).withHour(0).withMinute(0).withSecond(0).withNano(0);
            System.out.println("11111111111111111111111111111111111" + yesterday);
            LocalDateTime today = yesterday.plusDays(14);

            while (yesterday.isBefore(today)) {
                if(yesterday.getDayOfMonth() == 15){
                    yesterday = LocalDateTime.of(yesterday.getYear(), yesterday.getMonth(), 15, 14, 0);
                    Long incomePrice = 1374800L;
                    Income income = Income.of("(주) 삼성전자", incomePrice, account.getAccountAmount() + incomePrice, member, account, null);
                    incomeRepository.save(income);
                    income.update(yesterday, yesterday);
                    account.updateReceiveAmount(incomePrice);
                    accountRepository.save(account);

                    yesterday = yesterday.plusHours(9);
                    yesterday = yesterday.plusMinutes(55);
                }

                StoreDataUtil.RandomConsumption randomConsumption = storeDataUtil.randomStoreName();
                String consumptionDetail = randomConsumption.getValue();
                Long consumptionPrice = randomInitHolding() % 35000;
                if (consumptionPrice == 0) consumptionPrice = 43000L;

                Long consumptionRemainedAmount = account.getAccountAmount() - consumptionPrice;
                ConsumptionCategory consumptionCategory = consumptionCategoryRepository.findById((long) randomConsumption.getI()).orElseThrow(() -> new NoSuchElementException("존재하지 않는 카테고리 항목입니다."));

                if (consumptionRemainedAmount >= 0) {
                    Consumption consumption = Consumption.of(consumptionDetail, consumptionPrice, consumptionRemainedAmount, NOTSTART, member, account, null, account.getCards().get(0), consumptionCategory);
                    consumptionRepository.save(consumption);
                    consumption.update(yesterday, yesterday);
                    System.out.println(account.getId() +  "소비 전" + consumptionRemainedAmount);
                    account.updateSendAmount(consumptionPrice);
                    System.out.println(account.getId() + "소비 후" + account.getAccountAmount());
                    accountRepository.save(account);

                }
                yesterday = yesterday.plusHours(randomTime());
                yesterday = yesterday.plusMinutes(randomTime() * 10 + randomTime());
                System.out.println("222222222222222222222222222" + yesterday);
                while (yesterday.getHour() < 8) yesterday = yesterday.plusHours(randomTime());
            }
        }

    }

    public int randomTime() {
        Random random = new Random();
        int i = random.nextInt(4) + 8;
        return i;
    }

    private Long randomInitHolding() {
        Random random = new Random();
        // 1부터 10,000 사이의 난수 생성
        long randomHolding = random.nextInt(300) + 100L;
        return randomHolding * 1000;
    }

}
