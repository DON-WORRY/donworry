package com.ssafy.donworry.api.controller.member.dto.notification;

import com.ssafy.donworry.domain.member.entity.enums.NotificationStatus;
import com.ssafy.donworry.domain.member.entity.enums.NotificationType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DefaultNotificationDto {
    Long notificationId;
    String notificationContent;
    NotificationType notificationType;
    NotificationStatus notificationStatus;

    @Builder
    public DefaultNotificationDto(Long notificationId, String notificationContent, NotificationType notificationType, NotificationStatus notificationStatus) {
        this.notificationId = notificationId;
        this.notificationContent = notificationContent;
        this.notificationType = notificationType;
        this.notificationStatus = notificationStatus;
    }
}
