import styled from "styled-components"

type LoginNumberBoxProps = {
  userCode: string
}

const LoginNumberBox = ({ userCode }: LoginNumberBoxProps) => {
  return (
    <NumberContainer>
      <NumberBlock>{userCode.substring(0, 1)}</NumberBlock>
      <NumberBlock>{userCode.substring(1, 2)}</NumberBlock>
      <NumberBlock>{userCode.substring(2, 3)}</NumberBlock>
      <NumberBlock>{userCode.substring(3, 4)}</NumberBlock>
      <SpaceBlock>-</SpaceBlock>
      <NumberBlock>{userCode.substring(5, 6)}</NumberBlock>
      <NumberBlock>{userCode.substring(6, 7)}</NumberBlock>
      <NumberBlock>{userCode.substring(7, 8)}</NumberBlock>
      <NumberBlock>{userCode.substring(8, 9)}</NumberBlock>
    </NumberContainer>
  )
}

export default LoginNumberBox

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
