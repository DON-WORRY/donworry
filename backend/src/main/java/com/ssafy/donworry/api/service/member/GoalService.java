package com.ssafy.donworry.api.service.member;

import com.ssafy.donworry.api.service.member.request.GoalCreateServiceRequest;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.member.entity.Goal;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.GoalRepository;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class GoalService {

    private final MemberRepository memberRepository;
    private final GoalRepository goalRepository;

    public void createGoal(GoalCreateServiceRequest request) {
        Member member = memberRepository.findById(request.memberId()).orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        if (member.getGoals() == null) {
            try {
                goalRepository.save(Goal.of(request, member));
            } catch (Exception e) {
                throw new InvalidValueException(ErrorCode.GOAL_SAVE_ERROR);
            }
        }
        else{
            member.getGoals().update(request);
        }
    }
}
