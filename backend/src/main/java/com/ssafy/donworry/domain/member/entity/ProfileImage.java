package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.common.util.file.UploadFile;
import com.ssafy.donworry.domain.BaseEntity;
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
public class ProfileImage extends BaseEntity {

    @Id
    @Column(name = "profile_image_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Embedded
    private UploadFile uploadFile;

    @NotNull
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public ProfileImage(Long id, UploadFile uploadFile, Member member) {
        this.id = id;
        this.uploadFile = uploadFile;
        this.member = member;
    }

}
