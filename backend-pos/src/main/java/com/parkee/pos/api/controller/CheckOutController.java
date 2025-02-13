package com.parkee.pos.api.controller;

import com.parkee.pos.api.dto.CheckOutRequest;
import com.parkee.pos.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/parking")
public class CheckOutController {
    @Autowired
    private CheckOutService checkOutService;

    @PostMapping("/checkout")
    public ResponseEntity<String> checkOut(@RequestBody CheckOutRequest checkOutRequest){
        return ResponseEntity.ok(checkOutService.checkOutVehicle(checkOutRequest));
    }
}
