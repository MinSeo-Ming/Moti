import styled from "styled-components"

const LoginPageTitle = () => {
  return (
    <TitleDiv>
      <TitleM>M</TitleM>
      <TitleO>O</TitleO>
      <TitleT>T</TitleT>
      <TitleI>I</TitleI>
    </TitleDiv>
  )
}

export default LoginPageTitle

const TitleDiv = styled.div`
  padding: 20px;
  padding-bottom: 0;
  postion: relative;
  display: flex;
  flex-direction: row;
`

const TitleM = styled.p`
  flex: 1;
  margin: 0;
  font-size: 80px;
  color: #ea4335;
  letter-spacing: 0.15em;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #fff7f2;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const TitleO = styled.p`
  flex: 1;
  margin: 0;
  font-size: 80px;
  color: #fbbc05;
  border: 1px white;
  letter-spacing: 0.15em;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #fff7f2;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const TitleT = styled.p`
  flex: 1;
  margin: 0;
  font-size: 80px;
  color: #4285f4;
  letter-spacing: 0.15em;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #fff7f2;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const TitleI = styled.p`
  flex: 1;
  margin: 0;
  font-size: 80px;
  color: #34a853;
  letter-spacing: 0.15em;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #fff7f2;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`
