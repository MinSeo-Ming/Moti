package com.ssafy.moti.repository.log;

import com.ssafy.moti.entity.log.MotiClosenessLog;
import com.ssafy.moti.entity.log.MotiFeedLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MotiClosenessLogRepository extends JpaRepository<MotiClosenessLog,Long> {
    List<MotiClosenessLog> findAllByTimerDateAndUserNo(String timerDate, Long userNo);

}

