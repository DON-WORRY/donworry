package com.ssafy.donworry.api.controller.member.dto.notification;

import com.ssafy.donworry.domain.member.entity.enums.NotificationStatus;
import com.ssafy.donworry.domain.member.entity.enums.NotificationType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DutchpayNotificationDto {
    Long notificationId;
    String notificationContent;
    NotificationType notificationType;
    NotificationStatus notificationStatus;
    Long accountId;
    Long detailDutchpayId;

    @Builder
    public DutchpayNotificationDto(Long notificationId, String notificationContent, NotificationType notificationType, NotificationStatus notificationStatus, Long accountId, Long detailDutchpayId) {
        this.notificationId = notificationId;
        this.notificationContent = notificationContent;
        this.notificationType = notificationType;
        this.notificationStatus = notificationStatus;
        this.accountId = accountId;
        this.detailDutchpayId = detailDutchpayId;
    }
}
