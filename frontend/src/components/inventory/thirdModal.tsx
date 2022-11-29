import styled from "styled-components"
import { useEffect } from "react"

type thirdModalProps = {
  itemNo: number
  itemName: string
  newName: string
  status: number
  reRender: boolean
  setItemIdx: React.Dispatch<React.SetStateAction<number>>
  setNewName: React.Dispatch<React.SetStateAction<string>>
  setOpenModal: React.Dispatch<React.SetStateAction<number>>
  setReRender: React.Dispatch<React.SetStateAction<boolean>>
  useItem: (itemNo: number, name: string) => void
}

type Colors = {
  [key: number]: string
}

const ThirdModal = (props: thirdModalProps) => {
  const itemName = props.itemName
  const newName = props.newName
  const itemNo = props.itemNo
  const status = props.status
  const colors: Colors = { 201: "green", 204: "tomato", 400: "tomato" }
  useEffect(() => {
    console.log(status)
  })

  return (
    <ModalWindow colors={colors} status={status}>
      {itemName === "이름표" ? (
        <Contents>
          모티의 이름을 <br />'{newName}'<br />
          (으)로 변경하시겠습니까?
        </Contents>
      ) : (
        <Contents>
          {status === 201 && `${props.itemName} 사용 완료`}
          {status === 204 && `${itemName}이 부족해요ㅠㅠ`}
          {status === 400 && (
            <div>
              ❗<br />
              <br />
              0단계에서는 <br /> 사용할 수 없습니다
            </div>
          )}
        </Contents>
      )}
      {itemName === "알로초" ? (
        <Buttons>
          <ItemButton
            onClick={() => {
              props.setItemIdx(-1)
              props.setOpenModal(0)
              props.setReRender(!props.reRender)
            }}
            style={{ background: "#ed922b" }}
          >
            확인
          </ItemButton>
        </Buttons>
      ) : (
        <Buttons>
          <ItemButton
            onClick={() => {
              props.setOpenModal(2)
              props.setNewName("")
            }}
            style={{ background: "#ed6f6d" }}
          >
            취소
          </ItemButton>
          <ItemButton
            onClick={() => {
              props.useItem(itemNo, newName)
              props.setOpenModal(4)
            }}
            style={{ background: "#639deb" }}
          >
            사용
          </ItemButton>
        </Buttons>
      )}
    </ModalWindow>
  )
}

export default ThirdModal

const ModalWindow = styled.div<{ colors: Colors; status: number }>`
  width: 50%;
  height: 50%;
  background: white;
  box-shadow: 1px 1px 3px;
  // border: solid 2px ${(props) => props.colors[props.status]};
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
`

const Contents = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 20px 10px 10px;
  font-size: 14.5px;
  text-align: center;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const ItemButton = styled.button`
  border-radius: 4px;
  color: white;
  height: 30px;
  width: 60px;
  margin-bottom: 15px;
  box-shadow: 1px 1px 0.6px #000000;
  cursor: pointer;
  &:hover {
    filter: brightness(80%);
  }
`
