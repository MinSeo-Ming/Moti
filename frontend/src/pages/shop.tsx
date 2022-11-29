import { CommonNav } from "components/common"
import { ShopList, AlertModal, ItemModal } from "components/shop"
import * as React from "react"
import styled from "styled-components"
import { itemAPI } from "api"
import { useRecoilState } from "recoil"
import { coinState } from "store"
// 버튼에 아이콘 넣기 - ok
// 버튼 누르면 구매 및 아이템 설명 alert창
// 구매시 가격만큼 토큰 줄어듦
// 아이템 갯수는 하나 늘어남
// 가지고 있는 토큰이 아이템 가격보다 적으면 구매불가 alert창
// 아이템 배열로 반복 돌리는걸로 수정.... -ok

const ShopPage = () => {
  const [openModal, setOpenModal] = React.useState<number>(-1)
  const [alertModalOpen, setAlertModalOpen] = React.useState(false)
  const [alertStatus, setAlertStatus] = React.useState(0)
  const [items, setItems] = React.useState([])
  const [storeCoinState, setStoreCoinState] = useRecoilState(coinState)

  React.useEffect(() => {
    itemAPI.getShopItemList().then(({ data }) => {
      setItems(data)
    })
  }, [])

  const purchaseItem = (itemCatalogNo: number, itemPrice: number) => {
    if (itemPrice > storeCoinState) {
      setAlertStatus(1)
    } else {
      itemAPI.addItemPurchaseEvent(itemCatalogNo).then((status) => {
        if (status === 201) {
          setAlertStatus(2)
          itemAPI.getItemGoods().then(({ data }) => {
            console.log(data)
            setStoreCoinState(data.userGoods.COIN)
          })
        } else if (status === 406) {
          setAlertStatus(3)
        }
      })
    }
  }

  React.useEffect(() => {
    if (alertStatus > 0) {
      setAlertModalOpen(true)
    }
  }, [alertStatus])

  return (
    <ShopPageContainer>
      <CommonNav bgColor="#a1c5ff" pageTitle="상점" linkPage="/menu" />
      <ShopList items={items} setOpenModal={setOpenModal} />
      {openModal > -1 ? (
        <ItemModal
          items={items}
          setOpenModal={setOpenModal}
          i={openModal}
          purchaseItem={purchaseItem}
        />
      ) : null}
      {alertModalOpen ? (
        <AlertModal
          status={alertStatus}
          setAlertModalOpen={setAlertModalOpen}
          setAlertStatus={setAlertStatus}
        />
      ) : null}
    </ShopPageContainer>
  )
}

export default ShopPage

const ShopPageContainer = styled.div`
  background: #e3eeff;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`
