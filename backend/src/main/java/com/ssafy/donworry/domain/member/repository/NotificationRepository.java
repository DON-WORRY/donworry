package com.ssafy.donworry.domain.member.repository;

import com.ssafy.donworry.domain.member.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
