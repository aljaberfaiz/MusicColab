package com.MC.musicColab.Repositories;

import com.MC.musicColab.Model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<user, Long> {
    user findByUsername(String username);
}
