package com.ssafy.moti.repository.dev.moti;

import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.moti.UserMotiInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserMotiInfoRepository extends JpaRepository<UserMotiInfo,Long> {
    UserMotiInfo findByUser(User user);
    Optional<UserMotiInfo> findById(Long userNo);

    boolean existsUserMotiInfoById (Long userNo);
}
