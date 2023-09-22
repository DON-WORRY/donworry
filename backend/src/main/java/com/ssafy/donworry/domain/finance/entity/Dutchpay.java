package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.api.controller.finance.dto.request.ReqAmountRequest;
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
import static jakarta.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor
public class Dutchpay extends BaseEntity {
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

    @Builder
    public Dutchpay(Long id, Long dutchpayReqPrice, Long dutchpayReceivedPrice, DutchpayStatus dutchpayStatus, Member member, Consumption consumption) {
        this.id = id;
        this.dutchpayReqPrice = dutchpayReqPrice;
        this.dutchpayReceivedPrice = dutchpayReceivedPrice;
        this.dutchpayStatus = dutchpayStatus;
        this.member = member;
        this.consumption = consumption;
    }

    public static Dutchpay of(ReqAmountRequest req, Member member, Consumption consumption) {
        return Dutchpay.builder()
                .dutchpayReqPrice(req.price())
                .dutchpayReceivedPrice(0l)
                .dutchpayStatus(DutchpayStatus.INCOMPLETE)
                .member(member)
                .consumption(consumption)
                .build();
    }
}
