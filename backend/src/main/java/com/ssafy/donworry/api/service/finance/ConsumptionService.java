package com.ssafy.donworry.api.service.finance;

import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.ConsumptionCategory;
import com.ssafy.donworry.domain.finance.repository.ConsumptionCategoryRepository;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ConsumptionService {
    private final ConsumptionRepository consumptionRepository;
    private final ConsumptionCategoryRepository consumptionCategoryRepository;
    public Long modifyCategory(Long consumptionId, Long categoryId) {
        Consumption consumption = consumptionRepository.findById(consumptionId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.CONSUMPTION_NOT_FOUND)
                );
        ConsumptionCategory consumptionCategory = consumptionCategoryRepository.findById(categoryId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.CONSUMPTION_CATEGORY_NOT_FOUND)
                );
        consumption.modifyCategory(consumptionCategory);
        consumptionRepository.save(consumption);
        return consumptionId;
    }
}
