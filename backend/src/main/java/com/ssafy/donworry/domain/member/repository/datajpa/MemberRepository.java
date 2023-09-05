package com.ssafy.donworry.domain.member.repository.datajpa;

import com.ssafy.donworry.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
