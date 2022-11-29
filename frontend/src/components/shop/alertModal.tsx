import styled, { keyframes } from "styled-components"

type AlertModalProps = {
  status: number
  setAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setAlertStatus: React.Dispatch<React.SetStateAction<number>>
}
const AlertModal = ({ status, setAlertModalOpen, setAlertStatus }: AlertModalProps) => {
  return (
    <AlertModalWindow borderColor={status === 1 ? "#ffaaaa" : status === 2 ? "#5a95f5" : "#26b562"}>
      <AlertModalTitleContainer>
        <AlertModalTitle>
          {status === 1 ? "코인부족!!" : status === 2 ? "구매완료!!" : "에러발생!!"}
        </AlertModalTitle>
      </AlertModalTitleContainer>
      <AlertModalButtonContainer>
        <AlertModalButton
          bgColor="#639deb"
          onClick={() => {
            setAlertModalOpen(false)
            setAlertStatus(0)
          }}
        >
          확인
        </AlertModalButton>
      </AlertModalButtonContainer>
    </AlertModalWindow>
  )
}

export default AlertModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`
type AlertModalWindowProps = {
  borderColor: string
}

const AlertModalWindow = styled.div<AlertModalWindowProps>`
  width: 45%;
  height: 37%;
  background: #ffffff;
  box-shadow: 1px 1px 3px;
  // border: solid 2px ${(props) => props.borderColor};
  border: solid 2px;
  border-radius: 4px;
  z-index: 3;
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.1s ease-out;
`
const AlertModalTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  height: auto;
`
const AlertModalTitle = styled.span`
  font-size: 25px;
`

const AlertModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

type AlertButtonType = {
  bgColor: string
}

const AlertModalButton = styled.button<AlertButtonType>`
  border-radius: 4px;
  padding: 0;
  width: 60px;
  height: 30px;
  background: ${(props) => props.bgColor};
  cursor: pointer;
  box-shadow: 1px 1px 0.6px #000000;
  color: #ffffff;
  &:hover {
    filter: brightness(80%);
  }
`
