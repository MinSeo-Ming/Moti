import styled from "styled-components"
import { useEffect } from "react"

type FourthModalProps = {
  itemNo: number
  itemName: string
  newName: string
  status: number
  reRender: boolean
  setItemIdx: React.Dispatch<React.SetStateAction<number>>
  setNewName: React.Dispatch<React.SetStateAction<string>>
  setOpenModal: React.Dispatch<React.SetStateAction<number>>
  setStatus: React.Dispatch<React.SetStateAction<number>>
  setReRender: React.Dispatch<React.SetStateAction<boolean>>
  useItem: (itemNo: number, name: string) => void
}

type Colors = {
  [key: number]: string
}

const FourthModal = (props: FourthModalProps) => {
  const itemName = props.itemName
  const newName = props.newName
  const status = props.status
  const colors: Colors = { 201: "green", 204: "tomato", 400: "tomato" }
  useEffect(() => {
    console.log(status)
  })

  return (
    <ModalWindow colors={colors} status={status}>
      <Contents>
        {status === 201 && (
          <div>
            '{newName}'
            <br />
            (으)로 변경되었습니다
          </div>
        )}
        {status === 204 && `${itemName}이 부족해요ㅠㅠ`}
        {status === 400 && (
          <div>
            ❗<br />
            <br />
            이름은 공백 없는
            <br />
            2~8자로 입력해주세요!
          </div>
        )}
      </Contents>
      <Buttons>
        <ItemButton
          onClick={() => {
            props.setNewName("")
            props.setOpenModal(0)
            props.setStatus(0)
            props.setReRender(!props.reRender)
          }}
          style={{ background: "#ed922b" }}
        >
          확인
        </ItemButton>
      </Buttons>
    </ModalWindow>
  )
}

export default FourthModal

const ModalWindow = styled.div<{ colors: Colors; status: number }>`
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
  cursor: pointer;
  box-shadow: 1px 1px 0.6px #000000;
  &:hover {
    filter: brightness(80%);
  }
`
