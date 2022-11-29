import styled, { keyframes } from "styled-components"

type LogoutModalProps = {
  setLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  doLogout: () => void
}

const LogoutModal = ({ setLogoutModalOpen, doLogout }: LogoutModalProps) => {
  return (
    <LogoutModalWindow>
      <LogoutTitleDiv>
        주인님 어디가요
        <br />
        ㅠㅠ
      </LogoutTitleDiv>
      <LogoutModalButtonDiv>
        <LogoutButtonDiv onClick={doLogout}>로그아웃</LogoutButtonDiv>
        <GoSettingButtonDiv
          onClick={() => {
            setLogoutModalOpen(false)
          }}
        >
          취소
        </GoSettingButtonDiv>
      </LogoutModalButtonDiv>
    </LogoutModalWindow>
  )
}

export default LogoutModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const LogoutModalWindow = styled.div`
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

const LogoutTitleDiv = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 20px 10px;
`

const LogoutModalButtonDiv = styled.div`
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

const LogoutButtonDiv = styled.button`
  border-radius: 4px;
  color: #ffffff;
  width: 60px;
  height: 30px;
  padding: 0px;
  background: #ed6f6d;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0.5px 1px 0.6px #000000;
  &:hover {
    filter: brightness(80%);
  }
`
