package com.ssafy.donworry.api.controller.member.dto.notification;

import com.ssafy.donworry.domain.member.entity.Notification;
import com.ssafy.donworry.domain.member.entity.enums.NotificationStatus;
import com.ssafy.donworry.domain.member.entity.enums.NotificationType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public record DefaultNotificationDto(
        Long notificationId,
        String notificationContent,
        NotificationType notificationType,
        NotificationStatus notificationStatus
) {
    public static DefaultNotificationDto of(Notification notification) {
        return new DefaultNotificationDto(
                notification.getId(),
                notification.getNotificationContent(),
                notification.getNotificationType(),
                notification.getNotificationStatus()
        );
    }

}
