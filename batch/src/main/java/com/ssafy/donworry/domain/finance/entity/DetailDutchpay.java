package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.api.controller.finance.dto.request.ReqAmountRequest;
import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.Notification;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor
public class DetailDutchpay extends BaseEntity {
    @Id
    @Column(name = "detail_dutchpay_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    private Long dutchpayReqPrice;

    @NotNull
    private Long dutchpayReceivedPrice;

    @NotNull
    @Enumerated(STRING)
    private DutchpayStatus dutchpayStatus;

    @OneToOne(mappedBy = "detailDutchpay", cascade = ALL, orphanRemoval = true)
    private Notification notification;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "dutchpay_id")
    private Dutchpay dutchpay;

    @Builder
    public DetailDutchpay(Long id, Long dutchpayReqPrice, Long dutchpayReceivedPrice, DutchpayStatus dutchpayStatus, Notification notification, Member member, Dutchpay dutchpay) {
        this.id = id;
        this.dutchpayReqPrice = dutchpayReqPrice;
        this.dutchpayReceivedPrice = dutchpayReceivedPrice;
        this.dutchpayStatus = dutchpayStatus;
        this.notification = notification;
        this.member = member;
        this.dutchpay = dutchpay;
    }

    public static DetailDutchpay of(ReqAmountRequest req, Member member, Dutchpay dutchpay) {
        return DetailDutchpay.builder()
                .dutchpayReqPrice(req.price())
                .dutchpayReceivedPrice(0l)
                .dutchpayStatus(DutchpayStatus.PROGRESS)
                .member(member)
                .dutchpay(dutchpay)
                .build();
    }

    public void updateDetailDutchpay(Long price, DutchpayStatus dutchpayStatus) {
        this.dutchpayReceivedPrice += price;
        this.dutchpayStatus = dutchpayStatus;
    }
}
