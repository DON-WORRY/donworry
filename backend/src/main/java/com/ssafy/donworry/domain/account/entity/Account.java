package com.ssafy.donworry.domain.account.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @Size(max = 30)
    private String number;

    @NotNull
    private Long holdings;

    @Builder
    public Account(Long id, Member member, Bank bank, String number, Long holdings) {
        this.id = id;
        this.member = member;
        this.bank = bank;
        this.number = number;
        this.holdings = holdings;
    }
}
