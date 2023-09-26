package com.ssafy.donworry.api.service.member;


import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.member.repository.EmitterRepository;
import com.ssafy.donworry.domain.member.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.yaml.snakeyaml.emitter.Emitter;

import java.io.IOException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final EmitterRepository emitterRepository;
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    public void createNotification(){

    }

    public SseEmitter subscribe(Long memberId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(memberId, emitter);
        emitter.onCompletion(() -> emitterRepository.delete(memberId));
        emitter.onTimeout(() -> emitterRepository.delete(memberId));
        try {
            log.info("connect : " + memberId);
            emitter.send(SseEmitter.event()
                    .id("id")
                    .name("sse")
                    .data("connect completed")
            );

        } catch (IOException exception) {
            throw new InvalidValueException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
        return emitter;


    }
}
