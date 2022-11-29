package com.ssafy.moti.repository.log;

import com.ssafy.moti.common.enums.EventType;
import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.entity.log.UserGoodsLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGoodsLogRepository extends JpaRepository<UserGoodsLog, Long> {
    /**
     * 특정 날짜의 재화 로그를 조회한다
     *
     * @param timerDate 조회하고자 하는 날짜
     * @return UserGoodsLog의 리스트
     */
    List<UserGoodsLog> findByTimerDate(String timerDate);

    List<UserGoodsLog> findByTimerDateAndGoodsTypeAndEventTypeAndUserNo(String timerDate, GoodsType goodsTypes, EventType eventType, Long userNo);
}
