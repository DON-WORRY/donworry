package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.entity.Card;
import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor
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





}
