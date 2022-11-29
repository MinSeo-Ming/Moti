import styled, { keyframes } from "styled-components"

type ItemType = {
  itemCatalogNo: number
  itemName: string
  itemDescription: string
  itemPrice: number
  itemImg: string
  itemGoods_type: string
  itemType: string
}

type ItemModalProps = {
  items: ItemType[]
  setOpenModal: React.Dispatch<React.SetStateAction<number>>
  i: number
  purchaseItem: (itemCatalogNo: number, itemPrice: number) => void
}

const ItemModal = ({ items, setOpenModal, i, purchaseItem }: ItemModalProps) => {
  const item = items[i]

  return (
    <ShopItemModalWindow>
      <ShopItemModalContents>
        <ShopItemModalImage src={item["itemImg"]} alt="item" />
        <ShopItemModalText>
          <ShopItemModalNamePriceDiv>
            <ShopItemModalName>{item["itemName"]}</ShopItemModalName>
            <ShopItemModalPriceDiv>
              <ShopItemModalPriceCoinIcon src="images/shop/coin.png" alt="coin" />
              <ShipItemModalPrice>{item["itemPrice"]}</ShipItemModalPrice>
            </ShopItemModalPriceDiv>
          </ShopItemModalNamePriceDiv>
          <ShopItemModalDescription>{item["itemDescription"]}</ShopItemModalDescription>
        </ShopItemModalText>
      </ShopItemModalContents>
      <ShopItemModalButtonsContainer>
        <ShopItemModalButton onClick={() => setOpenModal(-1)} style={{ background: "#ed6f6d" }}>
          취소
        </ShopItemModalButton>
        <ShopItemModalButton
          onClick={() => purchaseItem(item["itemCatalogNo"], item["itemPrice"])}
          style={{ background: "#4db037" }}
        >
          구입
        </ShopItemModalButton>
      </ShopItemModalButtonsContainer>
    </ShopItemModalWindow>
  )
}

export default ItemModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const ShopItemModalWindow = styled.div`
  width: 50%;
  height: 50%;
  background: white;
  box-shadow: 1px 1px 3px;
  border: solid 2px;
  border-radius: 4px;
  z-index: 2;
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${fadeIn} 0.1s ease-out;
`

const ShopItemModalContents = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 10px;
`

const ShopItemModalImage = styled.img`
  width: 40px;
  height: 40px;
`

const ShopItemModalText = styled.div`
  width: 70%;
`
const ShopItemModalNamePriceDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ShopItemModalPriceDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 1.5px;
`
const ShopItemModalPriceCoinIcon = styled.img`
  height: 15px;
  width: 15px;
  margin-bottom: 3px;
  padding: 0;
`

const ShipItemModalPrice = styled.div`
  font-size: 15px;
  margin-left: 2px;
`

const ShopItemModalName = styled.h4`
  margin: 0 0 4px 0;
`

const ShopItemModalDescription = styled.div`
  font-size: 12px;
  color: #6e6e6e;
`

const ShopItemModalButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 30%;
`

const ShopItemModalButton = styled.button`
  border-radius: 4px;
  color: white;
  height: 30px;
  width: 60px;
  margin-bottom: 15px;
  cursor: pointer;
  box-shadow: 1px 1px 0.6px #000000;
  &:hover {
    filter: brightness(80%);
  }
`
