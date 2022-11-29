package com.ssafy.moti.dto.response.item;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class UserInventoryResponse {
    private Long itemCatalogNo;
    private String itemName;
    private String itemDescription;
    private Long itemPrice;
    private String itemImg;
    private Long itemCount;
}
