package com.ssafy.moti.repository.dev.user;

import com.ssafy.moti.entity.dev.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserNo(Long userNo);

    Optional<User> findByUserName(String userName);
}
