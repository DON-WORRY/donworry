package com.ssafy.donworry.domain.finance.entity;

import com.ssafy.donworry.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor
public class ConsumptionCategory extends BaseEntity {
    @Id
    @Column(name = "consumption_category_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Size(max = 20)
    @NotNull
    private String consumptionCategoryName;
}
