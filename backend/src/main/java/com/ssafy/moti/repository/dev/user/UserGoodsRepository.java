package com.ssafy.moti.repository.dev.user;

import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.entity.dev.item.UserGoods;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserGoodsRepository extends JpaRepository<UserGoods, Long> {

    UserGoods findByUser_UserNoAndGoodsType(Long user_userNo, GoodsType goodsType);

    List<UserGoods> findUserGoodsByUser_UserNo(Long user_userNo);
}
