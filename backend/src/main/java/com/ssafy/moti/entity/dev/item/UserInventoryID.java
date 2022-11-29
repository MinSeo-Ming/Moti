package com.ssafy.moti.entity.dev.item;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class UserInventoryID implements Serializable {
    private Long user;
    private Long itemCatalog;
}
