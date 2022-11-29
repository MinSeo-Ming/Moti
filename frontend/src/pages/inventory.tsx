import { CommonNav } from "components/common"
import axios from "axios"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { Background } from "./menu"
import SecondModal from "components/inventory/secondModal"
import ThirdModal from "components/inventory/thirdModal"
import FourthModal from "components/inventory/fourthModal"

const Inventory = () => {
  type Item = {
    [key: string]: string | number
  }
  const [items, setItems] = useState<Item[]>([])
  const [status, setStatus] = useState<number>(0)
  const [reRender, setReRender] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<number>(0)
  const [itemIdx, setItemIdx] = useState<number>(-1)
  const [newName, setNewName] = useState<string>("")

  // 인벤토리 12칸 맞추기 위한 빈 배열
  const empty = Array.from({ length: 12 })

  const headers = {
    Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
  }

  const getInventory = () => {
    axios
      .get("http://k7a704.p.ssafy.io:8080/api/v1/item/inventory", {
        headers: headers,
      })
      .then((res) => {
        setItems(res.data)
      })
      .then(() => {
        console.log(items)
      })
  }

  const postInventory = (itemNo: number, name: string) => {
    axios
      .post(
        `http://k7a704.p.ssafy.io:8080/api/v1/item/inventory/use`,
        {
          itemCatalogNo: itemNo,
          message: name,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("아이템 사용 성공")
        setStatus(res.status)
      })
      .catch((err) => {
        setStatus(err.response.status)
      })
  }

  useEffect(() => {
    getInventory()
  }, [reRender])

  // 아이템 사용 함수
  const useItem = async (itemNo: number, name: string) => {
    postInventory(itemNo, name)
  }

  return (
    <Background>
      <CommonNav bgColor="#a1c5ff" pageTitle="인벤토리" linkPage="/menu" />
      <Items>
        {empty.map((item, i) =>
          items[i] ? (
            <ItemBorder key={items[i]["itemName"]}>
              <Item
                onClick={() => {
                  setOpenModal(1)
                  setItemIdx(i)
                  console.log(items[i])
                }}
              >
                <ItemIcon src={items[i]["itemImg"] as string} alt="item" />
                <ItemCount>x{items[i]["itemCount"]}</ItemCount>
              </Item>
            </ItemBorder>
          ) : (
            <ItemBorderEmpty key={i}>
              <ItemEmpty />
            </ItemBorderEmpty>
          )
        )}
        {openModal === 1 && (
          <ItemModal
            i={itemIdx}
            items={items}
            setOpenModal={setOpenModal}
            setItemIdx={setItemIdx}
          />
        )}
        {openModal === 2 && (
          <SecondModal
            itemNo={items[itemIdx]["itemCatalogNo"] as number}
            itemName={items[itemIdx]["itemName"]}
            setItemIdx={setItemIdx}
            useItem={useItem}
            setOpenModal={setOpenModal}
            setNewName={setNewName}
            newName={newName}
          />
        )}
        {openModal === 3 && (
          <ThirdModal
            itemNo={items[itemIdx]["itemCatalogNo"] as number}
            itemName={items[itemIdx]["itemName"] as string}
            newName={newName}
            status={status}
            reRender={reRender}
            setItemIdx={setItemIdx}
            useItem={useItem}
            setNewName={setNewName}
            setOpenModal={setOpenModal}
            setReRender={setReRender}
          />
        )}
        {openModal === 4 && (
          <FourthModal
            itemNo={items[itemIdx]["itemCatalogNo"] as number}
            itemName={items[itemIdx]["itemName"] as string}
            newName={newName}
            status={status}
            reRender={reRender}
            setItemIdx={setItemIdx}
            useItem={useItem}
            setNewName={setNewName}
            setOpenModal={setOpenModal}
            setStatus={setStatus}
            setReRender={setReRender}
          />
        )}
      </Items>
    </Background>
  )
}

const ItemModal = (props: any) => {
  const item = props.items[props.i]
  return (
    <ModalWindow>
      <Contents>
        <ItemImage src={item["itemImg"]} alt="item" />
        <ItemText>
          <ItemName>{item["itemName"]}</ItemName>
          <ItemD>{item["itemDescription"]}</ItemD>
        </ItemText>
      </Contents>
      {item["itemName"] != "비상식량" ? (
        <Buttons>
          <ItemButton
            onClick={() => {
              props.setOpenModal(0)
              props.setItemIdx(-1)
            }}
            style={{ background: "#ed6f6d" }}
          >
            취소
          </ItemButton>
          <ItemButton
            onClick={() => {
              props.setOpenModal(2)
            }}
            style={{ background: "#639deb" }}
          >
            사용
          </ItemButton>
        </Buttons>
      ) : (
        <Buttons>
          <ItemButton
            onClick={() => props.setOpenModal(0)}
            style={{ background: "#ed922b" }}
          >
            확인
          </ItemButton>
        </Buttons>
      )}
    </ModalWindow>
  )
}

export default Inventory

const Items = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: 100%;
  margin: 3px 0;
`

const ItemBorder = styled.div`
  background: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57px;
  width: 57px;
  margin: 0 1.5px;
  clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px);
  &:hover {
    transform: scale( 1.1, 1.1 );
    z-index: 2
  }
}
`

const ItemBorderEmpty = styled.div`
  background: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57px;
  width: 57px;
  margin: 0 1.5px;
  clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px);
}
`

const Item = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  height: 55px;
  width: 55px;
  clip-path: polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px);
}
`

const ItemEmpty = styled.div`
  background: white;
  height: 55px;
  width: 55px;
  clip-path: polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px);
}
`

const ItemIcon = styled.img`
  height: 35px;
  width: 35px;
  margin-right: 8px;
  cursor: pointer;
`

const ItemCount = styled.div`
  width: 100%;
  text-align: right;
  margin: 3px 5px 0 0;
  font-size: 12px;
  // font-weight: bold;
`
const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

export const ModalWindow = styled.div`
  width: 50%;
  height: 50%;
  background: white;
  box-shadow: 1px 1px 3px;
  border: solid 2px #000000;
  border-radius: 4px;
  z-index: 999;
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${fadeIn} 0.1s ease-out;
`

export const Contents = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 10px;
`

export const ItemImage = styled.img`
  width: 40px;
  height: 40px;
`

export const ItemText = styled.div`
  width: 70%;
`

export const ItemName = styled.h4`
  margin: 0 0 4px 0;
`

export const ItemD = styled.div`
  font-size: 12px;
  color: #6e6e6e;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 30%;
`

export const ItemButton = styled.button`
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
