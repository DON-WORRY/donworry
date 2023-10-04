package com.ssafy.donworry.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.member.dto.response.GoalDetailResponse;
import com.ssafy.donworry.domain.member.entity.QGoal;
import com.ssafy.donworry.domain.member.entity.QMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.ssafy.donworry.domain.member.entity.QGoal.goal;
import static com.ssafy.donworry.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class GoalQueryRepository {

    private final JPAQueryFactory queryFactory;

    public GoalDetailResponse findGoalById(Long memberId){
        return queryFactory
                .select(Projections.constructor(GoalDetailResponse.class,
                        goal.id,
                        goal.goalAmount,
                        goal.goalStartTime,
                        goal.goalEndTime
                        ))
                .from(goal)
                .join(goal.member, member)
                .on(member.id.eq(memberId))
                .fetchOne();
    }

}
