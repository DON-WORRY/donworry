package com.ssafy.donworry.domain.account.entity;

import com.ssafy.donworry.api.controller.account.dto.response.AccountAllResponse;
import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Account extends BaseEntity {

    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "bank_id")
    private Bank bank;

    @NotNull
    @OneToMany(mappedBy = "account", cascade = ALL, orphanRemoval = true)
    private List<Card> cards;

    @NotNull
    @Size(max = 30)
    private String accountNumber;

    @NotNull
    private Long accountAmount;

    @Builder
    public Account(Long id, Member member, Bank bank, List<Card> cards, String accountNumber, Long accountAmount) {
        this.id = id;
        this.member = member;
        this.bank = bank;
        this.cards = cards;
        this.accountNumber = accountNumber;
        this.accountAmount = accountAmount;
    }

    public static Account of(Member member, Bank bank, String accountNumber, Long accountAmount){
        return Account.builder()
                .member(member)
                .bank(bank)
                .accountNumber(accountNumber)
                .accountAmount(accountAmount)
                .build();
    }

    public void updateSendAmount(Long sendPrice) {
        this.accountAmount -= sendPrice;
    }
    public void updateReceiveAmount(Long receivePrice){
        this.accountAmount += receivePrice;
    }
}
