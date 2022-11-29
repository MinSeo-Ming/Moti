package com.ssafy.moti.entity.deleteuser;

import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.entity.dev.item.UserGoodsID;
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
        schema = "delete_user"
)
@IdClass(UserGoodsID.class)
public class DeleteUserGoods implements Serializable {
    @Id
    @JoinColumn(name = "user_no")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DeleteUser user;

    @Id
    @Enumerated(EnumType.STRING)
    private GoodsType goodsType;

    private Long goodsCount;
}
