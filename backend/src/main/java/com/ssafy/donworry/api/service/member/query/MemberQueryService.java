package com.ssafy.donworry.api.service.member.query;

import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
import com.ssafy.donworry.api.controller.member.dto.response.MemberSearchResponse;
import com.ssafy.donworry.api.service.member.request.MemberLoginServiceRequest;
import com.ssafy.donworry.api.service.member.request.MemberSimplePasswordCheckServiceRequest;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.model.JwtCreateModel;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.util.JwtUtil;
import com.ssafy.donworry.common.util.RedisUtil;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.ssafy.donworry.domain.member.repository.query.MemberQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberQueryService {

    private final MemberRepository memberRepository;
    private final MemberQueryRepository memberQueryRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;

    public MemberLoginResponse loginMember(MemberLoginServiceRequest request){
        Member member = memberRepository.findByMemberEmail(request.memberEmail())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                );

        if(!encoder.matches(request.memberPassword(), member.getMemberPassword()))
            throw new InvalidValueException(ErrorCode.PASSWORD_NOT_MATCH);

        // TODO: 2023-09-25 Service Layer 분할 고민해보기
        
        MemberLoginResponse response = jwtUtil.generateAllToken(JwtCreateModel.of(member));

        try{
            redisUtil.setToken(response.memberId(), response.refreshToken());
            redisUtil.setUser(loadUserById(response.memberId()));
            redisUtil.deleteBlackList(response.memberId());
        } catch (Exception e){
            throw new InvalidValueException(ErrorCode.REDIS_CONN_ERROR);
        }

        return response;
    }

    public UserDetailsModel loadUserById(Long id){
        return redisUtil.getUser(id).orElseGet(
                () -> memberQueryRepository.findUserDetailsById(id).orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND))
        );
    }

    public void logoutMember(Long memberId){
        redisUtil.deleteToken(memberId);
        redisUtil.deleteUser(memberId);
        redisUtil.setBlackList(memberId);
    }

    public List<MemberSearchResponse> searchMember(String memberName, String userEmail){
        log.debug("userEmail: {}", userEmail);
        return memberRepository.findByMemberNameStartsWithAndMemberEmailNot(memberName, userEmail).stream()
                .map(
                        MemberSearchResponse::of
                )
                .collect(Collectors.toList());
    }

    public void checkSimplePassword(MemberSimplePasswordCheckServiceRequest request, Long memberId){
        log.debug("memberId: {}", memberId);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                );

        if(!encoder.matches(request.memberSimplePassword(), member.getMemberSimplePassword()))
            throw new InvalidValueException(ErrorCode.SIMPLE_PASSWORD_NOT_MATCH);
    }

}
