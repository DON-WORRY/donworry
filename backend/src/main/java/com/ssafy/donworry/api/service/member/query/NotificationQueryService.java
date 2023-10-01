package com.ssafy.donworry.api.service.member.query;

import com.ssafy.donworry.api.controller.member.dto.response.NotificationListResponse;
import com.ssafy.donworry.domain.member.repository.NotificationRepository;
import com.ssafy.donworry.domain.member.repository.query.NotificationQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationQueryService {
    private final NotificationQueryRepository notificationQueryRepository;

    public NotificationListResponse searchNotification(Long memberId) {
        return notificationQueryRepository.findNotificationList(memberId);
    }
}
