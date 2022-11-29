package com.ssafy.moti.entity.dev.item;

import com.ssafy.moti.common.enums.GoodsType;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserGoodsID implements Serializable {
    private Long user;
    private GoodsType goodsType;
}
