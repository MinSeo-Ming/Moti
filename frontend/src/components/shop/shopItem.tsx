import * as React from "react"
import styled from "styled-components"

type ItemType = {
  itemCatalogNo: number
  itemName: string
  itemDescription: string
  itemPrice: number
  itemImg: string
  itemGoods_type: string
  itemType: string
}
type ShopItemProps = {
  index: number
  item: ItemType
  setOpenModal: React.Dispatch<React.SetStateAction<number>>
  style?: React.CSSProperties
}

const ShopItem = ({ index, item, setOpenModal, style }: ShopItemProps) => {
  return (
    <Item
      key={item["itemName"]}
      onClick={() => {
        setOpenModal(index)
      }}
      style={style}
    >
      <ItemButtonImg src={item["itemImg"]} alt="image" />
      <ItemName>{item["itemName"]}</ItemName>
      <Price>
        <PriceIcon src="images/shop/coin.png" alt="coin" />
        {item["itemPrice"]}
      </Price>
    </Item>
  )
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center
  border: none;
  &: hover {
    opacity: 80%;
  }
  cursor: pointer;
`

const ItemButtonImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 3px;
`

const ItemName = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  white-space: nowrap;
`

const Price = styled.div`
  // height: 15%;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const PriceIcon = styled.img`
  height: 15px;
  width: 15px;
`
export default ShopItem
