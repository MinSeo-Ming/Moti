package com.ssafy.moti.repository.log;

import com.ssafy.moti.entity.log.UserDeleteLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDeleteLogRepository extends JpaRepository<UserDeleteLog, Long> {
}
