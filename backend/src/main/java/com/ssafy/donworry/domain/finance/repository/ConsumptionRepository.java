package com.ssafy.donworry.domain.finance.repository;

import com.ssafy.donworry.domain.finance.entity.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsumptionRepository extends JpaRepository<Consumption, Long>{


}
