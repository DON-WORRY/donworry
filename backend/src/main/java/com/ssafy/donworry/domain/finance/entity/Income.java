package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor
public class Income extends BaseEntity {
    @Id
    @Column(name = "income_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    private String incomeDetail;

    @NotNull
    private Long incomePrice;

    @NotNull
    private Long incomeRemainedAmount;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sender_account_id")
    private Account senderAccount;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "dutchpay_id")
    private DutchPay dutchPay;

}
