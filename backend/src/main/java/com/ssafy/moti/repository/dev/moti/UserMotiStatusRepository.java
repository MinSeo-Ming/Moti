package com.ssafy.moti.repository.dev.moti;

import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.moti.UserMotiStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMotiStatusRepository extends JpaRepository<UserMotiStatus,Long> {
    UserMotiStatus findByUser(User user);
    boolean existsUserMotiStatusById(Long userNo);
}
