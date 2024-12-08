package com.MC.musicColab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.MC.musicColab.Repositories")
@SpringBootApplication
@ComponentScan(basePackages = "com.backend")
@EntityScan(basePackages = "com.MC.musicColab.Model")

public class MusicColabApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicColabApplication.class, args);
	}

}
