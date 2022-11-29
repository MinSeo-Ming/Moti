package com.ssafy.moti.service.item;

import com.ssafy.moti.common.enums.EventType;
import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.common.enums.LevelType;
import com.ssafy.moti.entity.dev.item.*;
import com.ssafy.moti.entity.dev.moti.MotiCatalog;
import com.ssafy.moti.entity.dev.moti.UserMotiInfo;
import com.ssafy.moti.entity.dev.moti.UserMotiStatus;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.log.UserGoodsLog;
import com.ssafy.moti.entity.log.UserItemLog;
import com.ssafy.moti.repository.dev.item.ItemCatalogRepository;
import com.ssafy.moti.repository.dev.item.ShopRepository;
import com.ssafy.moti.repository.dev.item.UserInventoryRepository;
import com.ssafy.moti.repository.dev.moti.MotiCatalogRepository;
import com.ssafy.moti.repository.dev.moti.UserMotiInfoRepository;
import com.ssafy.moti.repository.dev.moti.UserMotiStatusRepository;
import com.ssafy.moti.repository.dev.user.UserGoodsRepository;
import com.ssafy.moti.repository.dev.user.UserRepository;
import com.ssafy.moti.repository.log.UserGoodsLogRepository;
import com.ssafy.moti.repository.log.UserItemLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Slf4j
@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ItemCatalogRepository itemCatalogRepository;

    @Autowired
    ShopRepository shopRepository;

    @Autowired
    UserInventoryRepository userInventoryRepository;

    @Autowired
    UserGoodsRepository userGoodsRepository;

    @Autowired
    UserGoodsLogRepository userGoodsLogRepository;

    @Autowired
    UserItemLogRepository userItemLogRepository;

    @Autowired
    UserMotiInfoRepository userMotiInfoRepository;

    @Autowired
    UserMotiStatusRepository userMotiStatusRepository;

    @Autowired
    MotiCatalogRepository motiCatalogRepository;

    @Override
    public List<ItemCatalog> viewShop() {
        List<Shop> shopList = shopRepository.findAll();
        List<ItemCatalog> result = new ArrayList<>();
        for(Shop shop: shopList) {
            result.add(shop.getItemCatalog());
        }
        return result;
    }

    @Override
    public Map<GoodsType, Long> viewUserGoods(Long user_userNo) {
        List<UserGoods> userGoods = userGoodsRepository.findUserGoodsByUser_UserNo(user_userNo);

        Map<GoodsType, Long> result = new HashMap<>();
        for(UserGoods userGood: userGoods) {
            result.put(userGood.getGoodsType(), userGood.getGoodsCount());
        }
        return result;
    }

    @Override
    public List<UserInventory> viewInventory(Long userNo) {
        return userInventoryRepository.findUserInventoriesByUser_UserNoAndItemCountIsGreaterThan(userNo, 0L);
    }

    @Override
    public ItemCatalog findByItemCatalogNo(Long itemCatalogNo) {
        return itemCatalogRepository.findByItemCatalogNo(itemCatalogNo);
    }

    @Override
    public boolean canUserBuyItem(Long userNo, Long itemCatalogNo) {
        // 해당 아이템의 재화 타입과 필요 재화수와 사용자가 갖고 있는 재화 타입과 재화수를 비교
        ItemCatalog itemUserWantsToPurchase = findByItemCatalogNo(itemCatalogNo);

        Long goodsUserGot = userGoodsRepository.findByUser_UserNoAndGoodsType(
                userNo, itemUserWantsToPurchase.getItemGoodsType()
        ).getGoodsCount();

        return goodsUserGot >= itemUserWantsToPurchase.getItemPrice();
    }

    @Override
    public void buyItem(Long userNo, Long itemCatalogNo) {

        LocalDate timerDate = LocalDate.now();
        LocalTime timerTime = LocalTime.now();

        ItemCatalog itemCatalog = itemCatalogRepository.findByItemCatalogNo(itemCatalogNo);

        UserGoods userGoods = userGoodsRepository.findByUser_UserNoAndGoodsType(userNo, itemCatalog.getItemGoodsType());

        User user = userRepository.findByUserNo(userNo).orElse(null);

        // 아이템 정보가 inventory에 없다면 생성
        UserInventory userInventory;
        if(userInventoryRepository.existsByUserAndItemCatalog(user, itemCatalog)) {
            userInventory = userInventoryRepository.findByUserAndItemCatalog(
                    user, itemCatalog
            );
        } else {
            userInventory = userInventoryRepository.saveAndFlush(UserInventory.builder()
                    .user(user)
                    .itemCatalog(itemCatalog)
                    .itemCount(0L)
                    .build()
            );
        }

        log.debug("userInventory: "+userInventory.toString());

        UserInventoryID userInventoryID = new UserInventoryID(userNo, itemCatalogNo);

        log.debug("userInventoryID: "+userInventoryID);

        // 인벤토리 정보 갱신
        userItemLogRepository.save(
                UserItemLog.builder()
                        .timerDate(timerDate.toString())
                        .timerTime(timerTime.toString())
                        .userNo(userNo)
                        .itemCatalogNo(itemCatalogNo)
                        .countBeforeEvent(userInventory.getItemCount())
                        .countAfterEvent(userInventory.getItemCount() + 1)
                        .eventType(EventType.PURCHASE)
                        .build()
        );

        // 재화 정보 갱신
        userGoodsLogRepository.save(
                UserGoodsLog.builder()
                        .timerDate(timerDate.toString())
                        .timerTime(timerTime.toString())
                        .userNo(userNo)
                        .countBeforeEvent(userGoods.getGoodsCount())
                        .countAfterEvent(userGoods.getGoodsCount() - itemCatalog.getItemPrice())
                        .eventType(EventType.PURCHASE)
                        .goodsType(itemCatalog.getItemGoodsType())
                        .build()
        );
    }

    /**
     * 어려지는 풀 사용
     * @param userNo 사용자 no
     */
    // TODO: 알일땐 사용 불가
    @Override
    @Transactional
    public void useReset(Long userNo) throws IllegalAccessException, IllegalStateException {
        LocalDate timerDate = LocalDate.now();
        LocalTime timerTime = LocalTime.now();

        Optional<UserInventory> userInventory =
                userInventoryRepository.findUserInventoryByUser_UserNoAndItemCatalog_ItemCatalogNo(userNo, 1L);

        Optional<User> user = userRepository.findByUserNo(userNo);

        // 사용자가 없거나 inventory 정보가 없는 경우
        if(user.isEmpty() || userInventory.isEmpty()) {
            throw new IllegalAccessException();
        }

        // 사용자 모티 상태 조회
        UserMotiStatus userMotiStatus = userMotiStatusRepository.findByUser(user.get());

        // 사용자 모티 정보 조회
        UserMotiInfo userMotiInfo = userMotiInfoRepository.findByUser(user.get());

        if(userMotiInfo == null) { // 모티가 없는 경우
            throw new IllegalAccessException();
        }

        // 모티가 0레벨인 경우 사용할 수 없음
        if(userMotiInfo.getMotiCatalog().getMotiLevel() == LevelType.ZERO) {
            throw new IllegalStateException();
        }

        // 같은 모티 타입의 0단계인 모티 catalog no 조회
        MotiCatalog returnEgg = motiCatalogRepository.findByMotiTypeAndMotiLevel(
                userMotiInfo.getMotiCatalog().getMotiType(), LevelType.ZERO
        );

        // 어려짐
        userMotiInfo.setMotiCatalog(returnEgg);
        userMotiStatus.setSurvivalDays(0L);


        // 수정된 모티 정보 저장
        userMotiInfoRepository.save(userMotiInfo);
        userMotiStatusRepository.save(userMotiStatus);

        // 로그 생성 -> 아이템 갯수 차감
        userItemLogRepository.save(UserItemLog.builder()
                .userNo(userNo)
                .timerDate(timerDate.toString())
                .timerTime(timerTime.toString())
                .itemCatalogNo(userInventory.get().getItemCatalog().getItemCatalogNo())
                .countBeforeEvent(userInventory.get().getItemCount())
                .countAfterEvent(userInventory.get().getItemCount() - 1)
                .eventType(EventType.USE)
                .build()
        );
    }

    @Override
    @Transactional
    public void useNameTag(Long userNo, String message) throws IllegalAccessException, IllegalArgumentException {
        LocalDate timerDate = LocalDate.now();
        LocalTime timerTime = LocalTime.now();

        Optional<UserInventory> userInventory =
                userInventoryRepository.findUserInventoryByUser_UserNoAndItemCatalog_ItemCatalogNo(userNo, 2L);

        Optional<User> user = userRepository.findByUserNo(userNo);

        if(user.isEmpty() || userInventory.isEmpty()) {
            throw new IllegalAccessException();
        }

        if(!userMotiInfoRepository.existsUserMotiInfoById(userNo)) {
            throw new IllegalAccessException();
        }

        // 사용자 모티 정보 조회
        UserMotiInfo userMotiInfo = userMotiInfoRepository.findByUser(
                user.get()
        );

        // 변경할 이름은 null이어선 안되고, 공백이 존재해서도 안되고, 길이가 2보다 작거나 8보다 커서도 안된다.
        if(message == null || message.contains(" ") || message.length() < 2 || message.length() > 8) {
            throw new IllegalArgumentException();
        }

        // 모티 이름 수정
        userMotiInfo.setMotiName(message);

        // 수정된 모티 정보 저장
        userMotiInfoRepository.save(userMotiInfo);

        // 로그 생성 -> 아이템 갯수 차감
        userItemLogRepository.save(UserItemLog.builder()
                .userNo(userNo)
                .timerDate(timerDate.toString())
                .timerTime(timerTime.toString())
                .itemCatalogNo(userInventory.get().getItemCatalog().getItemCatalogNo())
                .countBeforeEvent(userInventory.get().getItemCount())
                .countAfterEvent(userInventory.get().getItemCount() - 1)
                .eventType(EventType.USE)
                .build()
        );
    }

    @Override
    public Optional<UserInventory> findUserInventoryByUser_UserNoAndItemCatalog_ItemCatalogNo(Long user_userNo, Long itemCatalog_itemCatalogNo) {
        return userInventoryRepository.findUserInventoryByUser_UserNoAndItemCatalog_ItemCatalogNo(user_userNo, itemCatalog_itemCatalogNo);
    }
}
