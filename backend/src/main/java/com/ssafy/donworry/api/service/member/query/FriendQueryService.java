package com.ssafy.donworry.api.service.member.query;

import com.ssafy.donworry.api.controller.member.dto.response.FriendListResponse;
import com.ssafy.donworry.api.controller.member.dto.response.FriendRequestListResponse;
import com.ssafy.donworry.api.controller.member.dto.response.FriendRequestResponse;
import com.ssafy.donworry.api.controller.member.dto.response.FriendResponse;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import com.ssafy.donworry.domain.member.entity.FriendRequest;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.FriendRelationshipRepository;
import com.ssafy.donworry.domain.member.repository.FriendRequestRepository;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.ssafy.donworry.domain.member.repository.query.FriendRelationshipQueryRepository;
import com.ssafy.donworry.domain.member.repository.query.FriendRequestQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendQueryService {

    private final MemberRepository memberRepository;
    private final FriendRequestQueryRepository friendRequestQueryRepository;
    private final FriendRelationshipQueryRepository friendRelationshipQueryRepository;

    public FriendRequestListResponse requestFriendList(Long memberId){

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        List<FriendRequestResponse> senderResponse = friendRequestQueryRepository.findReceivers(member);
        List<FriendRequestResponse> receiverResponse = friendRequestQueryRepository.findSenders(member);

        return FriendRequestListResponse.of(receiverResponse, senderResponse);
    }

    public FriendListResponse searchFriend(Long memberId){
        log.debug("memberId:{}", memberId);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        List<FriendResponse> senderFriend = friendRelationshipQueryRepository.findSenderFriend(member);
        List<FriendResponse> receiverFriend = friendRelationshipQueryRepository.findReceiverFriend(member);

        return FriendListResponse.of(Stream.concat(senderFriend.stream(), receiverFriend.stream()).collect(Collectors.toList()));
    }

}
