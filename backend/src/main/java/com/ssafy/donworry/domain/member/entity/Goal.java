package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.api.service.member.request.GoalCreateServiceRequest;
import com.ssafy.donworry.domain.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    private LocalDate goalStartTime;

    @NotNull
    private LocalDate goalEndTime;

    @NotNull
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Goal(Long id, Long goalAmount, LocalDate goalStartTime, LocalDate goalEndTime, Member member) {
        this.id = id;
        this.goalAmount = goalAmount;
        this.goalStartTime = goalStartTime;
        this.goalEndTime = goalEndTime;
        this.member = member;
    }

    public static Goal of(GoalCreateServiceRequest request, Member member){
        return Goal.builder()
                .goalAmount(request.goalAmount())
                .goalStartTime(request.goalStartTime())
                .goalEndTime(request.goalEndTime())
                .member(member)
                .build();
    }

    public void update(GoalCreateServiceRequest request){
        this.goalAmount = request.goalAmount();
        this.goalStartTime = request.goalStartTime();
        this.goalEndTime = request.goalEndTime();
    }
}
