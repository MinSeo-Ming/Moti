import styled from "styled-components"
import { useEffect, useState } from "react"

const SecondModal = (props: any) => {
  const itemName = props.itemName
  const itemNo = props.itemNo
  const newName = props.newName
  const [color, setColor] = useState<string>("")

  useEffect(() => {
    itemName === "알로초" ? setColor("tomato") : setColor("lightblue")
  }, [])

  const onChange = (e: any) => {
    props.setNewName(e.target.value)
    console.log(newName)
  }

  return (
    <ModalWindow color={color}>
      {itemName === "이름표" ? (
        <Contents>
          모티에게
          <br />
          새로운 이름을 지어주세요
          <NameInput
            type="text"
            placeholder="2~8자로 입력하세요"
            maxLength={8}
            minLength={2}
            autoFocus={true}
            onChange={onChange}
            value={newName}
          />
        </Contents>
      ) : (
        <Contents>
          '{itemName}'로 인해
          <strong style={{ color: "tomato" }}>0단계 모티가 됩니다!</strong>
          정말 사용할까요?
        </Contents>
      )}
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
        {itemName === "알로초" ? (
          <ItemButton
            onClick={() => {
              props.useItem(itemNo, "")
              props.setOpenModal(3)
            }}
            style={{ background: "#639deb" }}
          >
            사용
          </ItemButton>
        ) : (
          <ItemButton
            onClick={() => {
              props.setOpenModal(3)
            }}
            style={{ background: "#639deb" }}
          >
            확인
          </ItemButton>
        )}
      </Buttons>
    </ModalWindow>
  )
}

export default SecondModal

const ModalWindow = styled.div<{ color: string }>`
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
  font-size: 13.5px;
  text-align: center;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const NameInput = styled.input`
  width: 65%;
  height: 20px;
  text-align: center;
  border-radius: 10px;
  // border-color: #e3eeff;
  background: #e3eeff;
  // background: lightblue;
  // color: white;
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
