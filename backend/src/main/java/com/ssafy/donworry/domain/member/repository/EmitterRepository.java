package com.ssafy.donworry.domain.member.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class EmitterRepository {
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    // TODO: 2023-09-26 Map 대신 redis 사용 
    
    public SseEmitter save(Long memberId, SseEmitter emitter) {
        emitters.put(memberId, emitter);
        return emitter;
    }
    public void delete(Long memberId){
        emitters.remove(memberId);
    }

    public Optional<SseEmitter> get(Long memberId){
        SseEmitter result = emitters.get(memberId);
        return Optional.ofNullable(result);
    }
}
