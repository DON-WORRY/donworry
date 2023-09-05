package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.domain.member.entity.enums.NotificationStatus;
import com.ssafy.donworry.domain.member.entity.enums.NotificationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Notification {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private Long payment;

    @NotNull
    private String content;

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

    // TODO: 2023-09-04 income, consumption 연관관계 맵핑 추가 + @Builder 추가


}
