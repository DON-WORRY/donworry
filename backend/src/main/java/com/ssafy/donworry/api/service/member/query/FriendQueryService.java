package com.ssafy.donworry.api.service.member.query;

import com.ssafy.donworry.api.controller.member.dto.response.FriendRequestListResponse;
import com.ssafy.donworry.api.controller.member.dto.response.FriendRequestResponse;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.domain.member.entity.FriendRequest;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.FriendRequestRepository;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.ssafy.donworry.domain.member.repository.query.FriendRequestQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendQueryService {

    private final MemberRepository memberRepository;
    private final FriendRequestQueryRepository friendRequestQueryRepository;

    public FriendRequestListResponse requestFriendList(Long memberId){

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        // TODO: 2023-09-20 로직 맞는지 검증 필요

        List<FriendRequestResponse> receiverResponse = friendRequestQueryRepository.findReceivers(member);
        List<FriendRequestResponse> senderResponse = friendRequestQueryRepository.findSenders(member);

//        List<FriendRequestResponse> receiverResponse =  member.getRequestSenders().stream().map(
//                (friendRequest) -> {
//                    Member receivers = friendRequest.getReceiver();
//                    return FriendRequestResponse.of(receivers, friendRequest.getId());
//                }
//        ).collect(Collectors.toList());
//
//        List<FriendRequestResponse> senderResponse = member.getRequestReceivers().stream().map(
//                (friendRequest) -> {
//                    Member senders = friendRequest.getSender();
//                    return FriendRequestResponse.of(senders, friendRequest.getId());
//                }
//        ).collect(Collectors.toList());

        return FriendRequestListResponse.of(receiverResponse, senderResponse);
    }

}
