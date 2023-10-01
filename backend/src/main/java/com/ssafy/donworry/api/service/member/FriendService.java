package com.ssafy.donworry.api.service.member;

import com.ssafy.donworry.api.controller.member.dto.notification.DefaultNotificationDto;
import com.ssafy.donworry.api.service.member.query.FriendQueryService;
import com.ssafy.donworry.api.service.member.request.FriendCheckServiceRequest;
import com.ssafy.donworry.api.service.member.request.FriendRequestServiceRequest;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.util.SseUtil;
import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import com.ssafy.donworry.domain.member.entity.FriendRequest;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.Notification;
import com.ssafy.donworry.domain.member.entity.enums.FriendRequestStatus;
import com.ssafy.donworry.domain.member.repository.FriendRelationshipRepository;
import com.ssafy.donworry.domain.member.repository.FriendRequestRepository;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.ssafy.donworry.domain.member.repository.NotificationRepository;
import com.ssafy.donworry.domain.member.repository.query.FriendRelationshipQueryRepository;
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
    private final NotificationRepository notificationRepository;
    private final SseUtil sseUtil;

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
                    if(checkAlreadyFriendRelationship(sender, receiver)  || checkAlreadyFriendRelationship(receiver, sender)) throw new InvalidValueException(ErrorCode.ALREADY_FRIEND_RELATIONSHIP);
                    if(checkAlreadyFriendRequest(sender, receiver) || checkAlreadyFriendRequest(receiver, sender)) throw new InvalidValueException(ErrorCode.ALREADY_FRIEND_REQUEST);

                    try{
                        FriendRequest friendRequest = FriendRequest.of(receiver, sender);
                        Notification notification = Notification.ofFriendReq(friendRequest);
                        friendRequestRepository.save(friendRequest);
                        notificationRepository.save(notification);
                        DefaultNotificationDto dto = DefaultNotificationDto.of(notification);
                        sseUtil.send(receiver.getId(), dto);
                    }
                    catch(Exception e){
                        throw new InvalidValueException(ErrorCode.FRIEND_REQUEST_SAVE_ERROR);
                    }
                }
        );
    }

    private boolean checkAlreadyFriendRelationship(Member friend, Member member){
        if(friendRelationshipRepository.findByReceiverAndSender(friend, member).isPresent()) return true;
        return false;
    }

    private boolean checkAlreadyFriendRequest(Member friend, Member member){
        if(friendRequestRepository.findByReceiverAndSenderAndFriendRequestStatus(friend, member, FriendRequestStatus.ACTIVE).isPresent()) return true;
        return false;
    }

    public String checkFriend(FriendCheckServiceRequest request, Long memberId){
        FriendRequest friendRequest = friendRequestRepository.findById(request.friendRequestId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.FRIEND_REQUEST_NOT_FOUND)
                );

        friendRequest.updateStatus();

        log.debug("request.reqId:{}, request.Id: {}, memberId: {}", request.friendRequestId(), request.friendId(), memberId);

        log.debug("receiverId: {}, accept:{}", friendRequest.getReceiver().getId(), request.isAccept());
        if(friendRequest.getReceiver().getId() == memberId){

            if(request.isAccept()){
                FriendRelationship friendRelationship = FriendRelationship.of(friendRequest);
                Notification notification = Notification.ofFriendRel(friendRelationship);
                friendRelationshipRepository.save(friendRelationship);
                notificationRepository.save(notification);
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

