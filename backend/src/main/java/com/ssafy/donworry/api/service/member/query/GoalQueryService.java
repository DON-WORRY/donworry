package com.ssafy.donworry.api.service.member.query;


import com.ssafy.donworry.api.controller.member.dto.response.GoalDetailResponse;
import com.ssafy.donworry.domain.member.entity.Goal;
import com.ssafy.donworry.domain.member.repository.GoalRepository;
import com.ssafy.donworry.domain.member.repository.query.GoalQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GoalQueryService {

    private final GoalQueryRepository goalQueryRepository;

    public GoalDetailResponse searchGoalDetail(Long memberId){
        return goalQueryRepository.findGoalById(memberId);
    }
}
