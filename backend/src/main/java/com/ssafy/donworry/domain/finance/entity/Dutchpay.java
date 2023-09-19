package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import com.ssafy.donworry.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor
public class Dutchpay {
    @Id
    @Column(name = "dutchpay_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    private Long dutchpayReqPrice;

    @NotNull
    private Long dutchpayReceivedPrice;

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
}
