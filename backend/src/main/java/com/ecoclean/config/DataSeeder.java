package com.ecoclean.config;

import com.ecoclean.entity.User;
import com.ecoclean.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(UserRepository userRepository) {
        return args -> {
            // Create default admin if not exists
            if (!userRepository.existsByEmail("admin@ecoclean.com")) {
                User admin = new User("System Admin", "admin@ecoclean.com", "admin123", "9999999999", User.Role.ADMIN, "EcoClean HQ, City Center");
                userRepository.save(admin);
                System.out.println("✅ Default admin created: admin@ecoclean.com / admin123");
            }

            // Create default worker if not exists
            if (!userRepository.existsByEmail("worker1@ecoclean.com")) {
                User worker1 = new User("Rajesh Kumar", "worker1@ecoclean.com", "worker123", "9876543210", User.Role.WORKER, "Sector 15, Green Colony");
                userRepository.save(worker1);
                System.out.println("✅ Default worker created: worker1@ecoclean.com / worker123");
            }

            if (!userRepository.existsByEmail("worker2@ecoclean.com")) {
                User worker2 = new User("Amit Sharma", "worker2@ecoclean.com", "worker123", "9876543211", User.Role.WORKER, "Block B, Industrial Area");
                userRepository.save(worker2);
                System.out.println("✅ Default worker created: worker2@ecoclean.com / worker123");
            }

            // Create default citizen if not exists
            if (!userRepository.existsByEmail("citizen@ecoclean.com")) {
                User citizen = new User("Priya Patel", "citizen@ecoclean.com", "citizen123", "9876500001", User.Role.CITIZEN, "Flat 201, Rose Apartments, MG Road");
                userRepository.save(citizen);
                System.out.println("✅ Default citizen created: citizen@ecoclean.com / citizen123");
            }
        };
    }
}
