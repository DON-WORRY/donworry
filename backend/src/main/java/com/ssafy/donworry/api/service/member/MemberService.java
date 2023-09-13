package com.ssafy.donworry.api.service.member;


import com.ssafy.donworry.common.error.NotFoundException;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.repo.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    public Member findById(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(String.valueOf(Member.class), memberId));
    }
}
