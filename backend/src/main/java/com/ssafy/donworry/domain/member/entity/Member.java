package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.member.entity.enums.MemberActivateStatus;
import com.ssafy.donworry.domain.member.entity.enums.MemberGender;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Member extends BaseEntity {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Size(max = 20)
    @NotNull
    private String memberName;

    @Email
    @Size(max = 40)
    @NotNull
    private String memberEmail;

    @NotNull
    private String memberPassword;

    @NotNull
    @Enumerated(STRING)
    private MemberGender memberGender;

    @NotNull
    @Enumerated(STRING)
    private MemberRole memberRole;

    @NotNull
    @Enumerated(STRING)
    private MemberActivateStatus memberActivateStatus;

    @NotNull
    private LocalDate memberBirthDate;

    @OneToOne(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private ProfileImage profileImage;

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Goal> goals;

    @OneToMany(mappedBy = "receiver", cascade = ALL, orphanRemoval = true)
    private List<FriendRelationship> relationshipReceivers;

    @OneToMany(mappedBy = "sender", cascade = ALL, orphanRemoval = true)
    private List<FriendRelationship> relationshipSenders;

    @OneToMany(mappedBy = "receiver", cascade = ALL, orphanRemoval = true)
    private List<FriendRequest> requestReceivers;

    @OneToMany(mappedBy = "sender", cascade = ALL, orphanRemoval = true)
    private List<FriendRequest> requestSenders;

    @OneToMany(mappedBy = "receiver", cascade = ALL, orphanRemoval = true)
    private List<Notification> notificationReceivers;

    @OneToMany(mappedBy = "sender", cascade = ALL, orphanRemoval = true)
    private List<Notification> notificationSenders;

    // TODO: 2023-09-04 income, consumption, account 연관관계 맵핑 추가 + @Builder 추가

}
