import styled, { keyframes } from "styled-components"

type LoginFailedModalProps = {
  message: string
  LoginFailedButtonFunction: () => void
}

const LoginFailedModal = ({ message, LoginFailedButtonFunction }: LoginFailedModalProps) => {
  return (
    <LoginFailedModalWindow>
      <LoginFailedModalTitle>로그인 실패!</LoginFailedModalTitle>
      <LoginFailedModalMessage>error: {message}</LoginFailedModalMessage>
      <LoginFailedModalButton onClick={LoginFailedButtonFunction}>돌아가기</LoginFailedModalButton>
    </LoginFailedModalWindow>
  )
}

export default LoginFailedModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const LoginFailedModalWindow = styled.div`
  width: 50%;
  height: 50%;
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

const LoginFailedModalTitle = styled.div`
  font-size: 25px;
  color: #ea4335;
`

const LoginFailedModalMessage = styled.div`
  height: 20%;
  margin-top: 15px;
  font-size: 15px;
`

const LoginFailedModalButton = styled.button`
  border-radius: 4px;
  padding: 0;
  width: 60px;
  height: 30px;
  background: #ed922b;
  cursor: pointer;
  box-shadow: 1px 1px 0.6px #000000;
  color: #ffffff;
  &:hover {
    filter: brightness(80%);
  }
`
