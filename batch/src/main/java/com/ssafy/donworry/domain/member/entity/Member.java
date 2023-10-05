package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.Income;
import com.ssafy.donworry.domain.member.entity.enums.MemberActivateStatus;
import com.ssafy.donworry.domain.member.entity.enums.MemberGender;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;
import com.ssafy.donworry.domain.member.entity.enums.OauthProvider;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@ToString( exclude = {"profileImage", "incomes", "consumptions", "accounts"})
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
    private String memberSimplePassword;

    @NotNull
    @Enumerated(STRING)
    private MemberGender memberGender;

    @NotNull
    @Enumerated(STRING)
    private MemberRole memberRole;

    @NotNull
    @Enumerated(STRING)
    private MemberActivateStatus memberActivateStatus;

    @Enumerated(STRING)
    private OauthProvider memberOauthProvider;

    @NotNull
    private LocalDate memberBirthDate;

    @OneToOne(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private ProfileImage profileImage;

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Income> incomes;

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Consumption> consumptions;

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Account> accounts;

    @Builder
    public Member(Long id, String memberName, String memberEmail, String memberPassword, String memberSimplePassword, MemberGender memberGender, MemberRole memberRole, MemberActivateStatus memberActivateStatus, OauthProvider memberOauthProvider, LocalDate memberBirthDate, ProfileImage profileImage, List<Income> incomes, List<Consumption> consumptions, List<Account> accounts) {
        this.id = id;
        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberSimplePassword = memberSimplePassword;
        this.memberGender = memberGender;
        this.memberRole = memberRole;
        this.memberActivateStatus = memberActivateStatus;
        this.memberOauthProvider = memberOauthProvider;
        this.memberBirthDate = memberBirthDate;
        this.profileImage = profileImage;
        this.incomes = incomes;
        this.consumptions = consumptions;
        this.accounts = accounts;
    }

}
