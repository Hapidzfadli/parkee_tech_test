package com.parkee.pos.repository;

import com.parkee.pos.model.ParkingTicket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParkingTicketRepository extends JpaRepository<ParkingTicket, Long> {
    Optional<ParkingTicket> findByPlateNumberAndCheckOutTimeIsNull(String plateNumber);
    List<ParkingTicket> findByCheckOutTimeIsNull();
    List<ParkingTicket> findByPlateNumber(String plateNumber);
}
