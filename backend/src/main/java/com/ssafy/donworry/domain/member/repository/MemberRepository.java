package com.ssafy.donworry.domain.member.repository;

import com.ssafy.donworry.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByMemberEmail(String email);
    Optional<Member> findByMemberEmail(String email);

    List<Member> findByMemberNameStartsWith(String memberName);

}
