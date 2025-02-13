package com.parkee.pos.service.impl;

import com.parkee.pos.api.dto.CheckInRequest;
import com.parkee.pos.model.ParkingTicket;
import com.parkee.pos.repository.ParkingTicketRepository;
import com.parkee.pos.service.CheckInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CheckInServiceImpl implements CheckInService {
    @Autowired
    private ParkingTicketRepository parkingTicketRepository;

    @Override
    public String checkInVehicle(CheckInRequest checkInRequest) {
        if (parkingTicketRepository.findByPlateNumberAndCheckOutTimeIsNull(checkInRequest.getPlateNumber()).isPresent()) {
            return "Vehicle with plate number " + checkInRequest.getPlateNumber() + " is already checked in";
        }

        ParkingTicket ticket = new ParkingTicket();
        ticket.setPlateNumber(checkInRequest.getPlateNumber());
        ticket.setCheckInTime(LocalDateTime.now());
        parkingTicketRepository.save(ticket);
        return "Vehicle with plate number " + checkInRequest.getPlateNumber() + " has been checked in";
    }

}
