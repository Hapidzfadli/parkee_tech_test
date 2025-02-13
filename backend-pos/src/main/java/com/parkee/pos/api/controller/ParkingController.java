package com.parkee.pos.api.controller;

import com.parkee.pos.model.ParkingTicket;
import com.parkee.pos.service.ParkingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/parking")
@Slf4j
public class ParkingController {
    @Autowired
    private ParkingService parkingService;

    @GetMapping("/status/{plateNumber}")
    public ResponseEntity<Optional<ParkingTicket>> getParkingStatus(@PathVariable String plateNumber) {
        log.info("Getting parking status for plate number: {}", plateNumber);
        return ResponseEntity.ok(parkingService.getParkingStatus(plateNumber));
    }

    @GetMapping("/status")
    public ResponseEntity<List<ParkingTicket>> getAllParkedVehicles() {
        return ResponseEntity.ok(parkingService.getAllParkedVehicles());
    }

    @GetMapping("/history/{plateNumber}")
    public ResponseEntity<List<ParkingTicket>> getParkingHistory(@PathVariable String plateNumber) {
        return ResponseEntity.ok(parkingService.getParkingHistory(plateNumber));
    }

}
