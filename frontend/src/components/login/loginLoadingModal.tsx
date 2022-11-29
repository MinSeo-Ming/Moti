import styled, { keyframes } from "styled-components"

type LoginLoadingModalProps = {
  message: string
}

const LoginLoadingModal = ({ message }: LoginLoadingModalProps) => {
  return (
    <LoginLoadingModalWindow>
      <LoginLoadingTitle>로딩중...</LoginLoadingTitle>
      <LoginLoadingTitle>{message}</LoginLoadingTitle>
    </LoginLoadingModalWindow>
  )
}

export default LoginLoadingModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const LoginLoadingModalWindow = styled.div`
  width: 50%;
  height: 35%;
  background: white;
  box-shadow: 1px 1px 3px;
  border: solid 2px #000000;
  border-radius: 4px;
  z-index: 998;
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.25s linear;
  align-items: center;
  justify-content: center;
`

const LoginLoadingTitle = styled.div`
  margin-top: 5px;
  font-size: 20px;
`
