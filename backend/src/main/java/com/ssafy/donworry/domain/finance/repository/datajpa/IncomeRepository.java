package com.ssafy.donworry.domain.finance.repository.datajpa;

import com.ssafy.donworry.domain.finance.entity.ConsumptionCategory;
import com.ssafy.donworry.domain.finance.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income, Long>{

}
