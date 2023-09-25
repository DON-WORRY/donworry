package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.entity.Income;
import com.ssafy.donworry.domain.member.entity.enums.NotificationStatus;
import com.ssafy.donworry.domain.member.entity.enums.NotificationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Notification extends BaseEntity {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private Long notificationPayment;

    @NotNull
    private String notificationContent;

    @NotNull
    @Enumerated(STRING)
    private NotificationType notificationType;

    @NotNull
    @Enumerated(STRING)
    private NotificationStatus notificationStatus;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "dutchpay_id")
    private Dutchpay dutchpay;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "income_id")
    private Income income;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "consumption_id")
    private Consumption consumption;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "friend_request_id")
    private FriendRequest friendRequest;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "friend_relationship_id")
    private FriendRelationship friendRelationship;

    @Builder
    public Notification(Long id, Long notificationPayment, String notificationContent, NotificationType notificationType, NotificationStatus notificationStatus, Member receiver, Member sender, Dutchpay dutchpay, Income income, Consumption consumption, FriendRequest friendRequest, FriendRelationship friendRelationship) {
        this.id = id;
        this.notificationPayment = notificationPayment;
        this.notificationContent = notificationContent;
        this.notificationType = notificationType;
        this.notificationStatus = notificationStatus;
        this.receiver = receiver;
        this.sender = sender;
        this.dutchpay = dutchpay;
        this.income = income;
        this.consumption = consumption;
        this.friendRequest = friendRequest;
        this.friendRelationship = friendRelationship;
    }


}
