package com.ssafy.donworry.api.service.account;

import com.ssafy.donworry.common.util.StoreDataUtil;
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
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.ConsumptionCategory;
import com.ssafy.donworry.domain.finance.repository.ConsumptionCategoryRepository;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Random;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final BankRepository bankRepository;
    private final MemberRepository memberRepository;
    private final CardRepository cardRepository;
    private final CardCompanyRepository cardCompanyRepository;
    private final StoreDataUtil storeDataUtil;
    private final ConsumptionCategoryRepository consumptionCategoryRepository;
    private final ConsumptionRepository consumptionRepository;

    public void createMemberInitAccount(Long memberId) {

        Bank bank = bankRepository.findById(randomBankId())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 은행입니다."));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
        String accountNumber = randomAccountNumber();
        Account account = Account.of(member, bank, accountNumber, randomInitHolding());
        accountRepository.save(account);
        Long accountId = account.getId();
        createMemberInitCard(member.getId(), account.getId());
    }

    public void createMemberInitCard(Long memberId, Long accountId) {
        CardCompany cardCompany = cardCompanyRepository.findById(randomCardId()).orElseThrow(() -> new NoSuchElementException("존재하지않는 카드사입니다."));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new NoSuchElementException("존재하지 않는 계좌정보입니다."));

        Card card = Card.of(account, cardCompany, randomCardNumber(), CardType.CHECK_CARD, CardStatus.USING);
        cardRepository.save(card);

        createMemberInitConsumption(memberId, accountId, card.getId());
    }

    public void createMemberInitConsumption(Long memberId, Long accountId, Long cardId) {
        LocalDateTime nowTime = LocalDateTime.now();
        LocalDateTime history = LocalDateTime.now().minusMonths(2);

        while (history.isBefore(nowTime)) {

            StoreDataUtil.RandomConsumption randomConsumption = storeDataUtil.randomStoreName();
            String consumptionDetail = randomConsumption.getValue();
            Long consumptionPrice = randomInitHolding() % 100000;
            if (consumptionPrice == 0) consumptionPrice = 43000L;

            Account account = accountRepository.findById(accountId).orElseThrow(() -> new NoSuchElementException("존재하지 않는 계좌정보 입니다."));
            Long consumptionRemainedAmount = account.getAccountAmount() - consumptionPrice;
            Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원정보 입니다."));
            Card card = cardRepository.findById(cardId).orElseThrow(() -> new NoSuchElementException("존재하지 않는 카드정보입니다."));
            ConsumptionCategory consumptionCategory = consumptionCategoryRepository.findById(Long.valueOf(randomConsumption.getI())).orElseThrow(() -> new NoSuchElementException("존재하지 않는 카테고리 항목입니다."));

            if (consumptionRemainedAmount > consumptionPrice) {
                Consumption consumption = Consumption.of(consumptionDetail, consumptionPrice, consumptionRemainedAmount, member, account, null, card, consumptionCategory);
                consumptionRepository.save(consumption);
                consumption.update(history, history);
                account.updateAmount(consumptionPrice);

            }
            history = history.plusHours(randomTime());
            history = history.plusMinutes(randomTime() * 10 + randomTime());
            while (history.getHour() < 8) history = history.plusHours(randomTime());
        }
    }

    public int randomTime() {
        Random random = new Random();
        int i = random.nextInt(6) + 1;
        return i;
    }

    private Long randomBankId() {
        Random random = new Random();
        // 1부터 25 사이의 은행번호
        long randomId = random.nextInt(25) + 1L;
        return randomId;
    }

    // 1부터 20 사이의 카드사번호
    private Long randomCardId() {
        Random random = new Random();
        long randomId = random.nextInt(20) + 1L;
        return randomId;
    }

    private String randomAccountNumber() {
        // 사용할 문자셋
        String charset = "0123456789";
        int length = 13;
        StringBuilder randomAccountNumber = new StringBuilder(length);
        SecureRandom random = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(charset.length());
            char randomChar = charset.charAt(randomIndex);
            randomAccountNumber.append(randomChar);
        }
        if (accountRepository.existsByAccountNumber(randomAccountNumber.toString())) {
            return randomAccountNumber();
        }
        return randomAccountNumber.toString();
    }

    private Long randomInitHolding() {
        Random random = new Random();
        // 1부터 10,000 사이의 난수 생성
        long randomHolding = random.nextInt(10000) + 1L;
        return randomHolding * 1000;
    }

    private String randomCardNumber() {
        // 사용할 문자셋
        String charset = "0123456789";
        int length = 16;
        StringBuilder randomCardNumber = new StringBuilder(length);
        SecureRandom random = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(charset.length());
            char randomChar = charset.charAt(randomIndex);
            randomCardNumber.append(randomChar);
        }
        if (cardRepository.existsByCardNumber(randomCardNumber.toString())) ;
        return randomCardNumber.toString();
    }


}
