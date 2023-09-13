package com.ssafy.donworry.api.service.member.query;

import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.util.JwtUtil;
import com.ssafy.donworry.common.util.RedisUtil;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.ssafy.donworry.domain.member.repository.query.MemberQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberQueryService {

    private final MemberRepository memberRepository;
    private final MemberQueryRepository memberQueryRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;

    public UserDetailsModel loadUserById(Long id){
        return redisUtil.getUser(id).orElseGet(
                () -> memberQueryRepository.findUserDetailsById(id).orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_EMAIL))
        );
    }

}
