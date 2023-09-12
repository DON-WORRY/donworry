package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.domain.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Goal extends BaseEntity {

    @Id
    @Column(name = "goal_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    private Long goalAmount;

    @NotNull
    private LocalDateTime goalStartTime;

    @NotNull
    private LocalDateTime goalEndTime;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Goal(Long id, Long goalAmount, LocalDateTime goalStartTime, LocalDateTime goalEndTime, Member member) {
        this.id = id;
        this.goalAmount = goalAmount;
        this.goalStartTime = goalStartTime;
        this.goalEndTime = goalEndTime;
        this.member = member;
    }
}
