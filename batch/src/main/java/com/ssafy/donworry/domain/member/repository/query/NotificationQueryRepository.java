package com.ssafy.donworry.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.member.dto.response.NotificationHistoryResponse;
import com.ssafy.donworry.api.controller.member.dto.response.NotificationListResponse;
import com.ssafy.donworry.domain.member.entity.enums.NotificationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.member.entity.QNotification.notification;

@Repository
@RequiredArgsConstructor
public class NotificationQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;
    public NotificationListResponse findNotificationList(Long memberId) {
        List<NotificationHistoryResponse> list = jpaQueryFactory
                .select(Projections.constructor(
                        NotificationHistoryResponse.class,
                        notification.id,
                        notification.notificationContent,
                        notification.notificationType,
                        notification.notificationStatus
                ))
                .from(notification)
                .where(
                        notification.receiver.id.eq(memberId),
                        notification.notificationStatus.eq(NotificationStatus.UNCONFIRM)
                )
                .orderBy(notification.id.desc())
                .fetch();
        return NotificationListResponse.of(list);
    }
}
