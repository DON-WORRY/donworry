package com.ssafy.donworry.domain.member.repository;

import com.ssafy.donworry.domain.member.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}

