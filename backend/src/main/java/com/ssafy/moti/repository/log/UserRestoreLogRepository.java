package com.ssafy.moti.repository.log;

import com.ssafy.moti.entity.log.UserRestoreLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRestoreLogRepository extends JpaRepository<UserRestoreLog, Long> {
}
