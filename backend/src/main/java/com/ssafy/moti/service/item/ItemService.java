package com.ssafy.moti.service.item;

import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.entity.dev.item.ItemCatalog;
import com.ssafy.moti.entity.dev.item.UserInventory;
import com.ssafy.moti.entity.dev.user.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public interface ItemService {
    List<ItemCatalog> viewShop();

    Map<GoodsType, Long> viewUserGoods(Long user_userNo);

    List<UserInventory> viewInventory(Long userNo);

    ItemCatalog findByItemCatalogNo(Long itemCatalogNo);

    boolean canUserBuyItem(Long userNo, Long itemCatalogNo);

    void buyItem(Long userNo, Long itemCatalogNo);

    @Transactional
    void useReset(Long userNo) throws IllegalAccessException, IllegalStateException;

    @Transactional
    void useNameTag(Long userNo, String message) throws IllegalAccessException, IllegalArgumentException;

    Optional<UserInventory> findUserInventoryByUser_UserNoAndItemCatalog_ItemCatalogNo(Long user_userNo, Long itemCatalog_itemCatalogNo);
}
