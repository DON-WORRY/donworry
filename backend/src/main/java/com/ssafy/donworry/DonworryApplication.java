package com.ssafy.donworry;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.TimeZone;

@EnableJpaAuditing
@SpringBootApplication
@OpenAPIDefinition(servers = {@Server(url = "https://j9c210.p.ssafy.io", description = "Donworry Server URL"),
							  @Server(url = "http://localhost:8001", description = "Donworry Local URL")
})

public class DonworryApplication {

	@PostConstruct
	public void started() {
		// timezone UTC 셋팅
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	public static void main(String[] args) {
		SpringApplication.run(DonworryApplication.class, args);
	}

}
