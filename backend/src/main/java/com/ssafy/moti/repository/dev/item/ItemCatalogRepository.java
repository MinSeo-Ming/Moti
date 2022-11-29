package com.ssafy.moti.repository.dev.item;

import com.ssafy.moti.entity.dev.item.ItemCatalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCatalogRepository extends JpaRepository<ItemCatalog, Long> {
    ItemCatalog findByItemCatalogNo(Long itemCatalogNo);
}

