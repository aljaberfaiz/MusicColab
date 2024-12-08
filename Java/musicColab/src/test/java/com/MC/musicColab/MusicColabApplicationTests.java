package com.MC.musicColab;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

	private user user;

	@BeforeEach
	void setUp() {
		// Arrange: Initialize user object before each test
		user = new user(1L, "testUsername", "testPassword");
	}



	@Test
	void testNoArgsConstructor() {
		// Arrange: Create a new user using the no-args constructor
		User newUser = new User();

		// Assert: Check that default values are null (since no arguments are passed)
		assertNull(newUser.getId());
		assertNull(newUser.getUsername());
		assertNull(newUser.getPassword());
	}

	@Test
	void testAllArgsConstructor() {
		// Arrange: Create a new user using the all-args constructor
		User newUser = new User(3L, "allArgsUsername", "allArgsPassword");

		// Assert: Verify that all attributes are set correctly
		assertEquals(3L, newUser.getId());
		assertEquals("allArgsUsername", newUser.getUsername());
		assertEquals("allArgsPassword", newUser.getPassword());
	}

	@Test
	void testEqualsAndHashCode() {
		// Arrange: Create another user with the same attributes
		User anotherUser = new User(1L, "testUsername", "testPassword");

		// Assert: Verify that the equals method works correctly
		assertEquals(user, anotherUser);
		assertEquals(user.hashCode(), anotherUser.hashCode());

		// Arrange: Modify attributes and check inequality
		anotherUser.setId(2L);
		assertNotEquals(user, anotherUser);
	}
}
