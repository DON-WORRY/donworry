package com.ssafy.donworry.domain.finance.repository.datajpa;

import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.ConsumptionCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumptionRepository extends JpaRepository<Consumption, Long>{

}
