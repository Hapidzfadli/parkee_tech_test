package com.parkee.pos.service.impl;


import com.parkee.pos.model.ParkingTicket;
import com.parkee.pos.repository.ParkingTicketRepository;
import com.parkee.pos.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ParkingServiceImpl implements ParkingService {
    @Autowired
    private ParkingTicketRepository parkingTicketRepository;

    @Override
    public Optional<ParkingTicket> getParkingStatus(String plateNumber) {
        Optional<ParkingTicket> ticket = parkingTicketRepository.findByPlateNumberAndCheckOutTimeIsNull(plateNumber);
        ticket.ifPresent(t -> t.setTotalPrice(calculateCurrentTotalPrice(t)));
        return ticket;
    }

    @Override
    public List<ParkingTicket> getAllParkedVehicles() {
        List<ParkingTicket> tickets = parkingTicketRepository.findByCheckOutTimeIsNull();
        tickets.forEach(t -> t.setTotalPrice(calculateCurrentTotalPrice(t)));
        return tickets;
    }

    @Override
    public List<ParkingTicket> getParkingHistory(String plateNumber) {
        List<ParkingTicket> tickets = parkingTicketRepository.findByPlateNumber(plateNumber);
        tickets.forEach(t -> t.setTotalPrice(calculateTotalPrice(t)));
        return tickets;
    }

    private double calculateCurrentTotalPrice(ParkingTicket ticket) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(ticket.getCheckInTime(), now);
        long hours = duration.toHours() + 1;
        return hours * 3000;
    }

    private double calculateTotalPrice(ParkingTicket ticket) {
        LocalDateTime endTime = ticket.getCheckOutTime() != null ? ticket.getCheckOutTime() : LocalDateTime.now();
        Duration duration = Duration.between(ticket.getCheckInTime(), endTime);
        long hours = duration.toHours() + 1;
        return hours * 3000;
    }

}
