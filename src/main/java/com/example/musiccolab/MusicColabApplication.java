package com.example.musiccolab;

import Model.Composer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class MusicColabApplication {
    public static void main(String[] args)  {
        SpringApplication.run(MusicColabApplication.class, args);
        Composer composer = new Composer();
        composer.setFirstName("John");
        composer.setLastName("Smith");
        composer.setEmail("john.smith@gmail.com");
        composer.setGenre("Donkey");
        composer.setPhone("+931903824920384");

    }

}
