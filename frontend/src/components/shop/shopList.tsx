import * as React from "react"
import styled from "styled-components"
import ShopItem from "./shopItem"

type ItemType = {
  itemCatalogNo: number
  itemName: string
  itemDescription: string
  itemPrice: number
  itemImg: string
  itemGoods_type: string
  itemType: string
}
type ShopListProps = {
  items: ItemType[]
  setOpenModal: React.Dispatch<React.SetStateAction<number>>
}

const ShopList = ({ items, setOpenModal }: ShopListProps) => {
  return (
    <ShopListContainer>
      {items.map((item, i) =>
        items.length < 4 ? (
          <ItemsContainer key={i}>
            <ShopItem index={i} item={item} setOpenModal={setOpenModal} />
          </ItemsContainer>
        ) : (
          <ShopItem key={i} index={i} item={item} setOpenModal={setOpenModal} />
        )
      )}
    </ShopListContainer>
  )
}

const ShopListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 3px 15px;
  // height: 178px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ItemsContainer = styled.div`
  margin-top: 34px;
`
export default ShopList
