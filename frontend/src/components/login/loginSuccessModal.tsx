import styled, { keyframes } from "styled-components"

type LoginSuccessModalProps = {
  loginSuccess: () => void
}

const LoginSuccessModal = ({ loginSuccess }: LoginSuccessModalProps) => {
  return (
    <SuccessModalWindow>
      <SuccessTitleDiv>로그인성공!!</SuccessTitleDiv>
      <SuccessButtonDiv onClick={loginSuccess}>시작</SuccessButtonDiv>
    </SuccessModalWindow>
  )
}

export default LoginSuccessModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const SuccessModalWindow = styled.div`
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
  justify-content: center;
  animation: ${fadeIn} 0.25s linear;
  align-items: center;
`

const SuccessTitleDiv = styled.div`
  text-align: center;
  font-size: 25px;
  margin: 5px;
`

const SuccessButtonDiv = styled.button`
  border-radius: 4px;
  font-size: 16px;
  padding: 0;
  width: 60px;
  height: 30px;
  background: #639deb;
  cursor: pointer;
  margin-top: 25px;
  color: #ffffff;
  box-shadow: 1px 1px 0.6px #000000;
  &:hover {
    filter: brightness(80%);
  }
`
