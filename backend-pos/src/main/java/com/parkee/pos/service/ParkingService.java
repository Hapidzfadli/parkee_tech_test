package com.parkee.pos.service;

import com.parkee.pos.model.ParkingTicket;

import java.util.List;
import java.util.Optional;

public interface ParkingService {
    Optional<ParkingTicket> getParkingStatus(String plateNumber);
    List<ParkingTicket> getAllParkedVehicles();
    List<ParkingTicket> getParkingHistory(String plateNumber);
}
