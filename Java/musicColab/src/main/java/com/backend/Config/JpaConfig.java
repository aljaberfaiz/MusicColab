package com.backend.Config;

import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import javax.sql.DataSource;

@Configuration
public class JpaConfig {
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(@org.jetbrains.annotations.NotNull EntityManagerFactoryBuilder entityManagerFactoryBuilder, DataSource dataSource) {
        return entityManagerFactoryBuilder
                .dataSource(dataSource)
                .packages("com.MC.musicColab.Model")
                .build();
    }
}