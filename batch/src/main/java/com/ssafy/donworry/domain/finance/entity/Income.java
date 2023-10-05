package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

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

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sender_account_id")
    private Account senderAccount;

    @Builder
    public Income(Long id, String incomeDetail, Long incomePrice, Long incomeRemainedAmount, Member member, Account account, Account senderAccount) {
        this.id = id;
        this.incomeDetail = incomeDetail;
        this.incomePrice = incomePrice;
        this.incomeRemainedAmount = incomeRemainedAmount;
        this.member = member;
        this.account = account;
        this.senderAccount = senderAccount;
    }

    public static Income of(String incomeDetail, Long incomePrice, Long incomeRemainedAmount, Member member
            , Account account, Account senderAccount){
        return Income.builder()
                .incomeDetail(incomeDetail)
                .incomePrice(incomePrice)
                .incomeRemainedAmount(incomeRemainedAmount)
                .member(member)
                .account(account)
                .senderAccount(senderAccount)
                .build();
    }

}
