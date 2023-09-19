package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.api.service.member.request.MemberJoinServiceRequest;
import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.entity.Income;
import com.ssafy.donworry.domain.member.entity.enums.MemberActivateStatus;
import com.ssafy.donworry.domain.member.entity.enums.MemberGender;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
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

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Dutchpay> dutchpays;

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Income> incomes;

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Consumption> consumptions;

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Account> accounts;

    @Builder
    public Member(Long id, String memberName, String memberEmail, String memberPassword, MemberGender memberGender, MemberRole memberRole, MemberActivateStatus memberActivateStatus, LocalDate memberBirthDate, ProfileImage profileImage, List<Goal> goals, List<FriendRelationship> relationshipReceivers, List<FriendRelationship> relationshipSenders, List<FriendRequest> requestReceivers, List<FriendRequest> requestSenders, List<Notification> notificationReceivers, List<Notification> notificationSenders, List<Dutchpay> dutchpays, List<Income> incomes, List<Consumption> consumptions, List<Account> accounts) {
        this.id = id;
        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberGender = memberGender;
        this.memberRole = memberRole;
        this.memberActivateStatus = memberActivateStatus;
        this.memberBirthDate = memberBirthDate;
        this.profileImage = profileImage;
        this.goals = goals;
        this.relationshipReceivers = relationshipReceivers;
        this.relationshipSenders = relationshipSenders;
        this.requestReceivers = requestReceivers;
        this.requestSenders = requestSenders;
        this.notificationReceivers = notificationReceivers;
        this.notificationSenders = notificationSenders;
        this.dutchpays = dutchpays;
        this.incomes = incomes;
        this.consumptions = consumptions;
        this.accounts = accounts;
    }

    public static Member of(MemberJoinServiceRequest request){
        return Member.builder()
                .memberName(request.memberName())
                .memberEmail(request.memberEmail())
                .memberPassword(request.memberPassword())
                .memberGender(request.memberGender())
                .memberRole(request.memberRole())
                .memberActivateStatus(request.memberActivateStatus())
                .memberBirthDate(request.memberBirthDate())
                .build();
    }
}
