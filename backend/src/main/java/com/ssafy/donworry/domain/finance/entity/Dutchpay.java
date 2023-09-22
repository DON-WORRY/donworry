package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
public class Dutchpay extends BaseEntity {
    @Id
    @Column(name = "dutchpay_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(STRING)
    private DutchpayStatus dutchpayStatus;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "consumption_id")
    private Consumption consumption;

    @Builder
    public Dutchpay(Long id, @NotNull DutchpayStatus dutchpayStatus, @NotNull Member member, @NotNull Consumption consumption) {
        this.id = id;
        this.dutchpayStatus = dutchpayStatus;
        this.member = member;
        this.consumption = consumption;
    }
}
