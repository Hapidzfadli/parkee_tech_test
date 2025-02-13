package com.parkee.pos.service;

import com.parkee.pos.api.dto.CheckInRequest;

public interface CheckInService {
    String checkInVehicle(CheckInRequest checkInRequest);
}
