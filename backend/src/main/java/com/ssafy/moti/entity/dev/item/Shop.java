package com.ssafy.moti.entity.dev.item;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter

@Entity
public class Shop {
    @Id
    private Long id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "item_catalog_no")
    private ItemCatalog itemCatalog;
}
