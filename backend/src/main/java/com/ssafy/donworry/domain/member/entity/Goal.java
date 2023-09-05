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
    private LocalDateTime start_time;

    @NotNull
    private LocalDateTime end_time;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Goal(Long id, Long goalAmount, LocalDateTime start_time, LocalDateTime end_time, Member member) {
        this.id = id;
        this.goalAmount = goalAmount;
        this.start_time = start_time;
        this.end_time = end_time;
        this.member = member;
    }



}
