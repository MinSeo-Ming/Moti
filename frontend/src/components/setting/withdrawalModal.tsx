import styled, { keyframes } from "styled-components"

type WithdrawalModalProps = {
  setWithdrawalModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  doWithdrawal: () => void
}

const WithdrawalModal = ({ setWithdrawalModalOpen, doWithdrawal }: WithdrawalModalProps) => {
  return (
    <WithdrawalModalWindow>
      <WithdrawalTitle>쥔님...... </WithdrawalTitle>
      <WithdrawalModalButtonDiv>
        <WithdrawalButtonDiv onClick={doWithdrawal}>회원탈퇴</WithdrawalButtonDiv>
        <GoSettingButtonDiv
          onClick={() => {
            setWithdrawalModalOpen(false)
          }}
        >
          취소
        </GoSettingButtonDiv>
      </WithdrawalModalButtonDiv>
    </WithdrawalModalWindow>
  )
}

export default WithdrawalModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const WithdrawalModalWindow = styled.div`
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
  animation: ${fadeIn} 0.25s linear;
`

const WithdrawalTitle = styled.div`
  text-align: center;
  font-size: 25px;
  margin: 20px 10px;
`

const WithdrawalModalButtonDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 30%;
  margin-bottom: 15px;
`

const GoSettingButtonDiv = styled.button`
  cursor: pointer;
  background: #639deb;
  border-radius: 4px;
  width: 60px;
  height: 30px;
  color: #ffffff;
  box-shadow: 1px 1px 0.6px #000000;
  &:hover {
    filter: brightness(80%);
  }
`
const WithdrawalButtonDiv = styled.button`
  border-radius: 4px;
  color: #ffffff;
  width: 60px;
  height: 30px;
  background: #989898;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  font-size: 13px;
  box-shadow: 1px 1px 0.6px #000000;
  &:hover {
    filter: brightness(80%);
  }
`
