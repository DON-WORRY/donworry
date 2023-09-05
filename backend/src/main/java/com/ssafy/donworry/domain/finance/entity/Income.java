package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Income {
    @Id
    @Column(name = "income_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "account_id")
//    private Account account;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "consumption_id")
    private Consumption consumption;
    private Long price;
}
