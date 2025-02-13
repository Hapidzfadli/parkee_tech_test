package com.parkee.pos.dataloader;

import com.parkee.pos.model.ParkingTicket;
import com.parkee.pos.repository.ParkingTicketRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class ParkingTicketDataLoader {

    private final ParkingTicketRepository parkingTicketRepository;

    public ParkingTicketDataLoader(ParkingTicketRepository parkingTicketRepository) {
        this.parkingTicketRepository = parkingTicketRepository;
    }

    @PostConstruct
    public void loadData() {
        if (parkingTicketRepository.count() == 0) {
            List<ParkingTicket> tickets = Arrays.asList(
                    new ParkingTicket(null, "B1234XYZ", LocalDateTime.now().minusHours(2), LocalDateTime.now(), 5000.0),
                    new ParkingTicket(null, "D5678ABC", LocalDateTime.now().minusHours(3), LocalDateTime.now(), 7000.0),
                    new ParkingTicket(null, "F9876JKL", LocalDateTime.now().minusHours(1), null, null)
            );

            parkingTicketRepository.saveAll(tickets);
            System.out.println("✅ Data dummy berhasil dimasukkan ke database!");
        } else {
            System.out.println("⚠️ Data sudah ada, tidak menambahkan data baru.");
        }
    }
}
