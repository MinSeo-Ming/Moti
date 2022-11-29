package com.ssafy.moti.entity.dev.item;

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
        name = "user_inventory",
        schema = "dev"
)
@IdClass(UserInventoryID.class)
public class UserInventory implements Serializable {
    @Id
    @JoinColumn(name = "user_no")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Id
    @JoinColumn(name = "item_catalog_no")
    @ManyToOne
    private ItemCatalog itemCatalog;

    private Long itemCount;
}
