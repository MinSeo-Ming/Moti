package com.ssafy.moti.controller;

import com.ssafy.moti.common.auth.UserPrincipal;
import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.dto.request.item.ItemPurchaseRequest;
import com.ssafy.moti.dto.request.item.ItemUseRequest;
import com.ssafy.moti.dto.response.item.ItemPurchaseResponse;
import com.ssafy.moti.dto.response.item.UserGoodsResponse;
import com.ssafy.moti.dto.response.item.UserInventoryResponse;
import com.ssafy.moti.entity.dev.item.ItemCatalog;
import com.ssafy.moti.entity.dev.item.UserInventory;
import com.ssafy.moti.service.item.ItemService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/item")
public class ItemController {

    @Autowired
    ItemService itemService;

    @ApiOperation(value = "상점 조회")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "상점 조회 성공",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = ItemCatalog.class))
                            )
                    })
    })
    @GetMapping("/shop")
    public ResponseEntity<?> viewShop(
            @ApiIgnore
            Authentication authentication
    ) {
        // 상점 목록 조회
        return ResponseEntity.status(HttpStatus.OK).body(itemService.viewShop());
    }

    @ApiOperation(value = "사용자 인벤토리 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "인벤토리 조회 성공", content = @Content(schema = @Schema(implementation = UserInventoryResponse.class)))
    })
    @GetMapping("/inventory")
    public ResponseEntity<?> viewInventory(
            @ApiIgnore
            Authentication authentication
    ) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userNo = userPrincipal.getId();

        List<UserInventory> userInventories = itemService.viewInventory(userNo);

        List<UserInventoryResponse> result = new ArrayList<>();
        for(UserInventory userInventory: userInventories) {
            result.add(UserInventoryResponse.builder()
                    .itemCatalogNo(userInventory.getItemCatalog().getItemCatalogNo())
                    .itemDescription(userInventory.getItemCatalog().getItemDescription())
                    .itemImg(userInventory.getItemCatalog().getItemImg())
                    .itemName(userInventory.getItemCatalog().getItemName())
                    .itemPrice(userInventory.getItemCatalog().getItemPrice())
                    .itemCount(userInventory.getItemCount())
                    .build())
            ;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "사용자 재화 목록 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "재화 목록 조회 성공", content = @Content(schema = @Schema(implementation = UserGoodsResponse.class)))
    })
    @GetMapping("/goods")
    public ResponseEntity<?> viewGoods(
            @ApiIgnore
            Authentication authentication
    ) {
        // 재화 목록 조회
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userNo = userPrincipal.getId();

        Map<GoodsType, Long> userGoods = itemService.viewUserGoods(userNo);

        UserGoodsResponse responseBody = new UserGoodsResponse(userGoods);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @ApiOperation(value = "아이템 구매")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "정상적으로 구매된 경우"),
            @ApiResponse(responseCode = "400", description = "아이템 카탈로그 번호가 입력되지 않은 경우"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 아이템인 경우"),
            @ApiResponse(responseCode = "406", description = "재화가 부족한 경우")
    })
    @PostMapping("/inventory/purchase")
    public ResponseEntity<ItemPurchaseResponse> purchaseItem(
            @ApiIgnore
            Authentication authentication,
            @ApiParam(value = "사용할 아이템의 카탈로그 no", required = true)
            @RequestBody
            ItemPurchaseRequest itemPurchaseRequest
    ) {

        log.debug("request body : {}", itemPurchaseRequest.toString());

        if(itemPurchaseRequest.getItemCatalogNo() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if(itemPurchaseRequest.getItemCatalogNo() <= 0 || itemPurchaseRequest.getItemCatalogNo() > 3) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        // 해당 아이템의 재화 타입과 필요 재화수와 사용자가 갖고 있는 재화 타입과 재화수를 비교
        // 사용자가 갖고 있는 해당 재화 타입의 재화수가 같거나 더 크다면 구매 가능
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        if(itemService.canUserBuyItem(userPrincipal.getId(), itemPurchaseRequest.getItemCatalogNo())) {
            // TODO: Trigger
            itemService.buyItem(userPrincipal.getId(), itemPurchaseRequest.getItemCatalogNo());
          return ResponseEntity.status(HttpStatus.CREATED).build();
        } else { // 사용자가 갖고 있는 재화수가 더 작다면 구매 불가
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @ApiOperation(value = "아이템 사용")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "정상적으로 사용된 경우"),
            @ApiResponse(responseCode = "204", description = "아이템의 갯수가 부족할 때"),
            @ApiResponse(responseCode = "400", description = "아이템 사용 불가(알인 상태에서 아이템을 사용하려고 하거나, 변경하려는 이름이 잘못됐을 때)"),
            @ApiResponse(responseCode = "406", description = "모티가 존재하지 않는 상태에서 아이템을 사용하려고 할 때")
    })
    @PostMapping("/inventory/use")
    public ResponseEntity<?> useItem(
            @ApiIgnore
            Authentication authentication,
            @ApiParam(value = "사용할 아이템의 카탈로그 no와 메시지", required = true)
            @RequestBody
            ItemUseRequest itemUseRequest
    ) {
        final Long ITEM_CATALOG_RESET = 1L;
        final Long ITEM_CATALOG_NAMETAG = 2L;

        log.debug("request body : {}", itemUseRequest.toString());

        if(itemUseRequest.getItemCatalogNo() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<UserInventory> userItem = itemService.findUserInventoryByUser_UserNoAndItemCatalog_ItemCatalogNo(
                userPrincipal.getId(), itemUseRequest.getItemCatalogNo()
        );

        // 사용자의 인벤토리에서 해당 아이템의 갯수가 0 초과인지 확인
        if(userItem.isEmpty() || userItem.get().getItemCount() <= 0) { // 0 이하라면 사용 불가
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("아이템의 수량이 부족합니다");
        } else { // 0 초과라면 아이템 번호별로 아이템 사용 로직 호출
            if(Objects.equals(itemUseRequest.getItemCatalogNo(), ITEM_CATALOG_RESET)) { // 1번 아이템 : 어려지는 풀
                try {
                    itemService.useReset(userPrincipal.getId());
                } catch(IllegalStateException e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("레벨을 다시 확인해 주세요.");
                } catch(IllegalAccessException e) {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("아이템을 사용할 수 없습니다.");
                }
            } else if(Objects.equals(itemUseRequest.getItemCatalogNo(), ITEM_CATALOG_NAMETAG)) { // 2번 아이템 : 이름 변경권
                try {
                    itemService.useNameTag(userPrincipal.getId(), itemUseRequest.getMessage());
                } catch(IllegalAccessException e) {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("아이템을 사용할 수 없습니다.");
                } catch(IllegalArgumentException e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이름을 다시 확인해 주세요.");
                }
            } // 3번 아이템 : 비상 식량은 사용자가 직접 사용하는 아이템이 아님
            return ResponseEntity.status(HttpStatus.CREATED).body("정상적으로 사용되었습니다");
        }
    }
}
