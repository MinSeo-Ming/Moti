package com.ssafy.moti.entity.dev.item;

import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.common.enums.ItemType;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"itemName", "itemDescription", "itemImg"})
        },
        schema = "dev"
)
public class ItemCatalog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemCatalogNo;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private String itemDescription;

    @Column(nullable = false)
    private Long itemPrice;

    @Column(nullable = false)
    private String itemImg;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GoodsType itemGoodsType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ItemType itemType;
}



