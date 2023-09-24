package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.member.entity.enums.FriendRequestStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class FriendRequest extends BaseEntity {

    @Id
    @Column(name = "friend_request_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(STRING)
    private FriendRequestStatus friendRequestStatus;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;

    @Builder
    public FriendRequest(Long id, FriendRequestStatus friendRequestStatus, Member receiver, Member sender) {
        this.id = id;
        this.friendRequestStatus = friendRequestStatus;
        this.receiver = receiver;
        this.sender = sender;
    }

    public static FriendRequest of(Member receiver, Member sender){
        return FriendRequest.builder()
                .friendRequestStatus(FriendRequestStatus.ACTIVE)
                .receiver(receiver)
                .sender(sender)
                .build();
    }

    public void updateStatus(){
        this.friendRequestStatus = FriendRequestStatus.INACTIVE;
    }


}
