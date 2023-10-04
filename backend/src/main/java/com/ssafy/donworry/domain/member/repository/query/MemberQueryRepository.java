package com.ssafy.donworry.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.QMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.ssafy.donworry.domain.member.entity.QMember.member;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    public Optional<UserDetailsModel> findUserDetailsById(Long id){

        log.debug("토큰에 문제있어요:{}", id);
        return Optional.ofNullable(
                queryFactory
                        .select(Projections.constructor(UserDetailsModel.class,
                                member.id,
                                member.memberName,
                                member.memberEmail,
                                member.memberRole
                        ))
                        .from(member)
                        .where(member.id.eq(id))
                        .fetchOne()
        );
    }


}
