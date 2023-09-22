package com.ssafy.donworry.api.service.member;

import com.ssafy.donworry.api.service.member.request.FriendCheckServiceRequest;
import com.ssafy.donworry.api.service.member.request.FriendRequestServiceRequest;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import com.ssafy.donworry.domain.member.entity.FriendRequest;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.FriendRelationshipRepository;
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
    private final FriendRelationshipRepository friendRelationshipRepository;

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

    public String checkFriend(FriendCheckServiceRequest request, Long memberId){
        FriendRequest friendRequest = friendRequestRepository.findById(request.friendRequestId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.FRIEND_REQUEST_NOT_FOUND)
                );

        friendRequest.updateStatus();

        if(friendRequest.getReceiver().getId() == request.friendId()){
            if(request.isAccept()){
                friendRelationshipRepository.save(FriendRelationship.of(friendRequest));
                return "친구요청을 수락하였습니다.";
            }
            else return "친구요청을 거절하였습니다.";
        }
        else if(friendRequest.getSender().getId() == memberId){
            return "친구요청을 취소했습니다.";
        }
        else throw new InvalidValueException(ErrorCode.INVALID_INPUT_VALUE);

    }
}

