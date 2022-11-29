package com.ssafy.moti.dto.request.item;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ItemUseRequest {
    private Long itemCatalogNo;
    private String message;
}
