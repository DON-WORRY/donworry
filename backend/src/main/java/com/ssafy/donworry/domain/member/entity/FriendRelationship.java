package com.ssafy.donworry.domain.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class FriendRelationship {

    @Id
    @Column(name = "friend_relationship_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;

    @Builder
    public FriendRelationship(Long id, Member receiver, Member sender) {
        this.id = id;
        this.receiver = receiver;
        this.sender = sender;
    }



}
