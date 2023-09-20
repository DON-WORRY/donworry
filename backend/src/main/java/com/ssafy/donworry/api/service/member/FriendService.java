package com.ssafy.donworry.api.service.member;

import com.ssafy.donworry.api.service.member.request.FriendRequestServiceRequest;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.member.entity.FriendRequest;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.FriendRequestRepository;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FriendService {

    private final MemberRepository memberRepository;
    private final FriendRequestRepository friendRequestRepository ;

    public void requestFriend(FriendRequestServiceRequest request, Long memberId){
        request.memberEmails().forEach(
                (memberEmail) -> {
                    Member receiver = memberRepository.findByMemberEmail(memberEmail)
                            .orElseThrow(
                                    () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                            );

                    Member sender = memberRepository.findById(memberId)
                            .orElseThrow(
                                    () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                            );

                    if(receiver == sender) throw new EntityNotFoundException(ErrorCode.MEMBER_DUPLICATE);

                    try{
                        friendRequestRepository.save(FriendRequest.of(receiver, sender));
                    }
                    catch(Exception e){
                        throw new InvalidValueException(ErrorCode.FRIEND_REQUEST_SAVE_ERROR);
                    }
                }
        );

    }
}

