package com.parkee.pos.service.impl;

import com.parkee.pos.api.dto.CheckOutRequest;
import com.parkee.pos.model.ParkingTicket;
import com.parkee.pos.repository.ParkingTicketRepository;
import com.parkee.pos.service.CheckOutService;
import com.parkee.pos.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CheckOutServiceImpl implements CheckOutService {

    @Autowired
    private ParkingTicketRepository parkingTicketRepository;

    @Override
    public String checkOutVehicle(CheckOutRequest checkOutRequest) {
        Optional<ParkingTicket> optionalTicket = parkingTicketRepository.findByPlateNumberAndCheckOutTimeIsNull(checkOutRequest.getPlateNumber());
        if (optionalTicket.isEmpty()) {
            return "Vehicle with plate number " + checkOutRequest.getPlateNumber() + " is not checked in";
        }

        ParkingTicket ticket = optionalTicket.get();
        LocalDateTime checkOutTime = LocalDateTime.now();
        ticket.setCheckOutTime(checkOutTime);

        Duration duration = Duration.between(ticket.getCheckInTime(), checkOutTime);
        long hours = duration.toHours() + 1;

        double totalPrice = Utils.calculateTotalPrice(hours);
        ticket.setTotalPrice(totalPrice);
        parkingTicketRepository.save(ticket);
        return "Vehicle with plate number " + checkOutRequest.getPlateNumber() + " has been checked out. Total price: " + totalPrice;
    }
}
