package com.ssafy.moti.entity.dev.item;

import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.entity.dev.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Data
@Table(
        schema = "dev"
)
@IdClass(UserGoodsID.class)
public class UserGoods implements Serializable {
    @Id
    @JoinColumn(name = "user_no")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Id
    @Enumerated(EnumType.STRING)
    private GoodsType goodsType;

    @Column(nullable = false)
    private Long goodsCount;
}
