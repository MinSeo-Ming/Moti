package com.ssafy.moti.repository.dev.item;

import com.ssafy.moti.entity.dev.item.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
}
