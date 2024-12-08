package com.MC.musicColab.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "users")
@Data   // Lombok annotation to generate getters, setters, toString, equals, hashCode
@NoArgsConstructor  // Lombok annotation to generate a no-args constructor
@AllArgsConstructor // Lombok annotation to generate an all-args constructor
public class user {

    @Id
    private Long id;
    private String username;
    private String password;

    // No need to manually write getters, setters, or constructors
}
