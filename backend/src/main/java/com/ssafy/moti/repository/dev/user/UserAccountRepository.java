package com.ssafy.moti.repository.dev.user;

import com.ssafy.moti.common.enums.AuthProvider;
import com.ssafy.moti.entity.dev.user.UserAccount;
import com.ssafy.moti.entity.dev.user.UserAccountID;
import com.ssafy.moti.entity.dev.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserAccountRepository extends JpaRepository<UserAccount, UserAccountID> {

    Optional<UserAccount> findByUserAndProvider(User userNo, AuthProvider provider);
}
