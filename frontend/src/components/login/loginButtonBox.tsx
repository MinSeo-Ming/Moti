import styled from "styled-components"

type LoginButtonBoxProps = {
  LoginButtonClick: () => void
}

const LoginButtonBox = ({ LoginButtonClick }: LoginButtonBoxProps) => {
  return (
    <LoginContainer onClick={LoginButtonClick}>
      <LoginButtonImage src={"images/login/github.png"} />
      <LoginButtonSpan>Sign in with Github</LoginButtonSpan>
    </LoginContainer>
  )
}

export default LoginButtonBox

const LoginContainer = styled.div`
  margin-top: 20px;
  width: 85%;
  height: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  box-shadow: 0.6px 1px 2px #000000;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 15px;
  cursor: pointer;
`
const LoginButtonImage = styled.img`
  width: 24px;
  height: 24px;
`

const LoginButtonSpan = styled.span`
  margin-left: 5px;
  font-size: 18px;
`

const NumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const NumberBlock = styled.span`
  background: #ffffff;
  border-radius: 4px;
  border: 2px solid #000000;
  font-size: 35px;
  margin: 1px;
  padding: 2px;
  text-align: center;
`

const SpaceBlock = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin: 2px;
`
