package com.ssafy.donworry.api.service.member;


import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
import com.ssafy.donworry.api.service.account.AccountService;
import com.ssafy.donworry.api.service.member.request.MemberJoinServiceRequest;
import com.ssafy.donworry.api.service.member.request.MemberLoginServiceRequest;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.util.JwtUtil;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final AccountService accountService;

    public void joinMember(MemberJoinServiceRequest request){
        if(memberRepository.existsByMemberEmail(request.memberEmail()))
            throw new EntityNotFoundException(ErrorCode.MEMBER_DUPLICATE);

        try{
            Member member = Member.of(request);
            memberRepository.save(member);
            accountService.createMemberInitAccount(member.getId());
        } catch(Exception e){
            throw new EntityNotFoundException(ErrorCode.MEMBER_SAVE_ERROR);
        }
    }

}
