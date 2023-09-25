package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.entity.Card;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.Notification;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Consumption extends BaseEntity {
    @Id
    @Column(name = "consumption_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    private String consumptionDetail;

    @NotNull
    private Long consumptionPrice;

    @NotNull
    private Long consumptionRemainedAmount;

    @NotNull
    @Enumerated(STRING)
    private DutchpayStatus dutchpayStatus;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "receiver_account_id")
    private Account receiverAccount;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "consumption_category_id")
    private ConsumptionCategory consumptionCategory;

    @OneToOne(mappedBy = "consumption", cascade = ALL, orphanRemoval = true)
    private Notification notification;

    @Builder
    public Consumption(Long id, String consumptionDetail, Long consumptionPrice, Long consumptionRemainedAmount, DutchpayStatus dutchpayStatus, Member member, Account account, Account receiverAccount, Card card, ConsumptionCategory consumptionCategory, Notification notification) {
        this.id = id;
        this.consumptionDetail = consumptionDetail;
        this.consumptionPrice = consumptionPrice;
        this.consumptionRemainedAmount = consumptionRemainedAmount;
        this.dutchpayStatus = dutchpayStatus;
        this.member = member;
        this.account = account;
        this.receiverAccount = receiverAccount;
        this.card = card;
        this.consumptionCategory = consumptionCategory;
        this.notification = notification;
    }

    public static Consumption of(String consumptionDetail, Long consumptionPrice, Long consumptionRemainedAmount, DutchpayStatus dutchpayStatus,
                                 Member member, Account account, Account receiverAccount, Card card, ConsumptionCategory consumptionCategory) {
        return Consumption.builder()
                .consumptionDetail(consumptionDetail)
                .consumptionPrice(consumptionPrice)
                .consumptionRemainedAmount(consumptionRemainedAmount)
                .dutchpayStatus(dutchpayStatus)
                .member(member)
                .account(account)
                .receiverAccount(receiverAccount)
                .card(card)
                .consumptionCategory(consumptionCategory)
                .build();
    }

    public static Consumption of(String consumptionDetail, Long consumptionPrice, Long consumptionRemainedAmount, DutchpayStatus dutchpayStatus,
                                 Member member, Account account, Account receiverAccount, ConsumptionCategory consumptionCategory) {
        return Consumption.builder()
                .consumptionDetail(consumptionDetail)
                .consumptionPrice(consumptionPrice)
                .consumptionRemainedAmount(consumptionRemainedAmount)
                .dutchpayStatus(dutchpayStatus)
                .member(member)
                .account(account)
                .receiverAccount(receiverAccount)
                .consumptionCategory(consumptionCategory)
                .build();
    }

    public void modifyCategory(ConsumptionCategory consumptionCategory) {
        this.consumptionCategory = consumptionCategory;
    }

    public void updateDutchpayStatus(DutchpayStatus dutchpayStatus) {
        this.dutchpayStatus = dutchpayStatus;
    }
}
