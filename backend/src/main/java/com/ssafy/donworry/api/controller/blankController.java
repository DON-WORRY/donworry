package com.ssafy.donworry.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/blank")
public class blankController {

    @GetMapping
    public ResponseEntity<?> blank(){
        return ResponseEntity.ok(null);
    }


}
