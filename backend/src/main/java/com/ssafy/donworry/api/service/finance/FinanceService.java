package com.ssafy.donworry.api.service.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.TransferAccountRequest;
import com.ssafy.donworry.api.controller.member.dto.notification.DefaultNotificationDto;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.util.SseUtil;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.repository.AccountRepository;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.ConsumptionCategory;
import com.ssafy.donworry.domain.finance.entity.Income;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import com.ssafy.donworry.domain.finance.repository.ConsumptionCategoryRepository;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import com.ssafy.donworry.domain.finance.repository.IncomeRepository;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.Notification;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.ssafy.donworry.domain.member.repository.NotificationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus.COMPLETE;
import static com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus.NOTSTART;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FinanceService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder encoder;
    private final AccountRepository accountRepository;
    private final ConsumptionCategoryRepository consumptionCategoryRepository;
    private final IncomeRepository incomeRepository;
    private final ConsumptionRepository consumptionRepository;
    private final SseUtil sseUtil;
    private final NotificationRepository notificationRepository;


    public Long transferByAccount(Long memberId, TransferAccountRequest transferAccountRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                );
        if(!encoder.matches(transferAccountRequest.simplePassword(), member.getMemberSimplePassword())) {
            throw new InvalidValueException(ErrorCode.SIMPLE_PASSWORD_NOT_MATCH);
        }

        Account senderAccount = accountRepository.findById(transferAccountRequest.accountId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.ACCOUNT_NOT_FOUND)
                );
        Account receiverAccount = accountRepository.findByAccountNumber(transferAccountRequest.accountNumber());
        Long price = transferAccountRequest.price();
        if(senderAccount.getAccountAmount() < price) {
            throw new InvalidValueException(ErrorCode.ACCOUNT_NO_MONEY);
        }

        senderAccount.updateSendAmount(price);
        receiverAccount.updateReceiveAmount(price);

        accountRepository.save(senderAccount);
        log.info("save senderAccount : {}", senderAccount.getId());
        accountRepository.save(receiverAccount);
        log.info("save receiverAccount : {}", receiverAccount.getId());

        Income income = Income.of(
                member.getMemberName() + "님에게 " + price + "원 받음",
                price,
                receiverAccount.getAccountAmount(),
                receiverAccount.getMember(),
                receiverAccount,
                senderAccount
        );
        Consumption consumption = Consumption.of(
                receiverAccount.getMember().getMemberName() + "님에게 " + price + "원 이체",
                price,
                senderAccount.getAccountAmount(),
                COMPLETE,
                member,
                senderAccount,
                receiverAccount,
                consumptionCategoryRepository.findById(transferAccountRequest.consumptionCategoryId()).get()
        );

        incomeRepository.save(income);
        log.info("save income : {}", income.getId());


        Notification notification = Notification.ofIncome(income);
        notificationRepository.save(notification);
        log.info("save notification : {}", notification.getId());
        DefaultNotificationDto dto =  DefaultNotificationDto.builder()
                .notificationId(notification.getId())
                .notificationContent(notification.getNotificationContent())
                .notificationType(notification.getNotificationType())
                .notificationStatus(notification.getNotificationStatus())
                .build();
        sseUtil.send(receiverAccount.getMember().getId(), dto);


        consumptionRepository.save(consumption);
        log.info("save consumption : {}", consumption.getId());

        return memberId;
    }
}
