package com.ssafy.moti.repository.dev.moti;

import com.ssafy.moti.entity.dev.moti.DeadMoti;
import com.ssafy.moti.entity.dev.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeadMotiRepository extends JpaRepository<DeadMoti,Long> {
    List<DeadMoti> findAllByUser(User user);
}
