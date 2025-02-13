package com.parkee.pos.api.controller;

import com.parkee.pos.api.dto.CheckInRequest;
import com.parkee.pos.service.CheckInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/parking")
public class CheckInController {
    @Autowired
    private CheckInService checkInService;

    @PostMapping("/check-in")
    public ResponseEntity<String> checkIn(@RequestBody CheckInRequest checkInRequest) {
        return ResponseEntity.ok(checkInService.checkInVehicle(checkInRequest));
    }
}
