package com.ssafy.moti.entity.deleteuser;

import com.ssafy.moti.entity.dev.item.ItemCatalog;
import com.ssafy.moti.entity.dev.item.UserInventoryID;
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

@Entity
@Data
@Table(
        schema = "delete_user"
)
@IdClass(UserInventoryID.class)
public class DeleteUserInventory implements Serializable {
    @Id
    @JoinColumn(name = "user_no")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DeleteUser user;

    @Id
    @Column(name = "item_catalog_no")
    private Long itemCatalog;

    private Long itemCount;
}
