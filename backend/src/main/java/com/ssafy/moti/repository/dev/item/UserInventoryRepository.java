package com.ssafy.moti.repository.dev.item;

import com.ssafy.moti.entity.dev.item.ItemCatalog;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.item.UserInventory;
import com.ssafy.moti.entity.dev.item.UserInventoryID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserInventoryRepository extends JpaRepository<UserInventory, UserInventoryID> {
    List<UserInventory> findUserInventoriesByUser_UserNoAndItemCountIsGreaterThan(Long user_userNo, Long itemCount);

    boolean existsByUserAndItemCatalog(User user, ItemCatalog itemCatalog);

    UserInventory findByUserAndItemCatalog(User user, ItemCatalog itemCatalog);

    Optional<UserInventory> findUserInventoryByUser_UserNoAndItemCatalog_ItemCatalogNo(Long user_userNo, Long itemCatalog_itemCatalogNo);
}
