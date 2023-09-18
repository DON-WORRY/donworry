package com.ssafy.donworry.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.common.model.UserDetailsModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    public Optional<UserDetailsModel> findUserDetailsById(Long id){
//        return Optional.ofNullable(
//                queryFactory
//                        .select(Projections.constructor(
//
//                        ))
//
//        )
        return null;
    }

}
