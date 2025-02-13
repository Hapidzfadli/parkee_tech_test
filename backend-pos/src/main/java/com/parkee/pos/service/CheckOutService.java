package com.parkee.pos.service;

import com.parkee.pos.api.dto.CheckOutRequest;

public interface CheckOutService {
    String checkOutVehicle(CheckOutRequest checkOutRequest);
}
