package com.ssafy.donworry.common.util;

import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.member.entity.Notification;
import com.ssafy.donworry.domain.member.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class SseUtil {

    private final EmitterRepository emitterRepository;
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

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
            log.info("send 완료 : {}", memberId);

        } catch (IOException exception) {
            throw new InvalidValueException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
        return emitter;
    }

    public void send(Long memberId, Object data) {
        emitterRepository.get(memberId).ifPresentOrElse(it -> {
                    try {
                        it.send(SseEmitter.event()
                                .name("sse")
                                .data(data));
                        log.info("알림 보내기 성공");
                    } catch (IOException e) {
                        emitterRepository.delete(memberId);
                        throw new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND);
                    }
                },
                () -> log.info("emitter를 찾지 못했습니다.")
        );
    }

}
