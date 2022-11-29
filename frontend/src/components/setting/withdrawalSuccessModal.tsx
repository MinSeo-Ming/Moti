import styled, { keyframes } from "styled-components"

type WithdrawalSuccessModalProps = {
  withdrawalSuccess: () => void
}

const WithdrawalSuccessModal = ({ withdrawalSuccess }: WithdrawalSuccessModalProps) => {
  return (
    <WithDrawalSuccessModalWindow>
      <WithdrawalSucessTitle>ㅠ ㅠ</WithdrawalSucessTitle>
      <WithdrawalSucessTitle>ㅅ</WithdrawalSucessTitle>
      <WithdrawalSuccessBtn onClick={withdrawalSuccess}>확인..</WithdrawalSuccessBtn>
    </WithDrawalSuccessModalWindow>
  )
}

export default WithdrawalSuccessModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const WithDrawalSuccessModalWindow = styled.div`
  width: 50%;
  height: 40%;
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
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.25s linear;
`

const WithdrawalSucessTitle = styled.div`
  text-align: center;
  font-size: 25px;
  margin: 5px;
`
const WithdrawalSuccessBtn = styled.button`
  border-radius: 4px;
  color: #ffffff;
  width: 60px;
  height: 30px;
  background: #aaaaaa;
  padding: 0;
  box-shadow: 1px 1px 0.6px #000000;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    filter: brightness(80%);
  }
`
