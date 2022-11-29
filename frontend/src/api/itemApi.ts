import { request } from "./userApi"

export const itemAPI = {
  //
  //상점 아이템 목록 조회
  getShopItemList: async () => {
    return await request.get(`/item/shop`)
  },
  //
  //인벤토리 아이템 목록 조회
  getInvenItemList: async () => {
    return await request.get(`/item/inventory`)
  },
  //
  //사용자 재화 정보 조회
  getItemGoods: async () => {
    return await request.get(`/item/goods`)
  },
  //
  //아이템 구매
  addItemPurchaseEvent: async (itemCatalogNo: number) => {
    return await request
      .post(`/item/inventory/purchase`, { itemCatalogNo: itemCatalogNo })
      .then((res: any) => {
        return res.status
      })
      .catch((e: any) => {
        return e.response.status
      })
  },
  //
  //인벤토리 내 아이템 사용
  addItemUseEvent: async (itemCatalogNo: number, message: string) => {
    return await request
      .post(`/item/inventory/use`, {
        itemCatalogNo,
        message,
      })
      .then((res: any) => {
        console.log(res)
      })
  },
}
