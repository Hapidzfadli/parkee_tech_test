package com.parkee.pos.api.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckOutRequest {
    private String plateNumber;
}
