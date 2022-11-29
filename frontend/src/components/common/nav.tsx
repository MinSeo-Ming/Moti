import * as React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router"
import { coinState, menuOnoffState } from "../../store"
import { useRecoilValue, useRecoilState } from "recoil"

type props = {
  bgColor: string
  pageTitle: string
  linkPage: string
  fontColor?: string
}

const CommonNav = ({ bgColor, pageTitle, linkPage, fontColor }: props) => {
  const navigate = useNavigate()
  const coin = useRecoilValue(coinState)
  const [menuon, setMenuon] = useRecoilState(menuOnoffState)
  return (
    <NavContainer bgColor={bgColor}>
      <MenuButton
        onClick={() => {
          navigate(linkPage)
          setMenuon(!menuon)
        }}
        btnColor={fontColor ? fontColor : "#000000"}
      >
        {"<"}
      </MenuButton>
      <TitleName fontColor={fontColor ? fontColor : "#000000"}>{pageTitle}</TitleName>
      <CoinDiv>
        <CoinIcon src="images/shop/coin.png" alt="coin" />
        <CoinCount coinColor={fontColor ? fontColor : "#000000"}>{coin}</CoinCount>
      </CoinDiv>
    </NavContainer>
  )
}

export default CommonNav

interface DeviceProps {
  bgColor: string
}

const NavContainer = styled.div<DeviceProps>`
  background: ${(props) => props.bgColor};
  width: 100%;
  height: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 4px 4px 0 0;
`
type MenuButtonProps = {
  btnColor: string
}

const MenuButton = styled.button<MenuButtonProps>`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  width: 28px;
  &: hover {
    color: grey;
  }
  cursor: pointer;
  font-size: 17px;
  color: ${(props) => props.btnColor};
`

type TitleNameProps = {
  fontColor: string
}
const TitleName = styled.span<TitleNameProps>`
  white-space: nowrap;
  display: flex;
  display-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 1.05rem;
  font-size: 13px;
  color: ${(props) => props.fontColor};
`
const CoinDiv = styled.div`
  display: flex;
  display-direction: row;
  font-size: 10px;
  justify-content: center;
  align-items: center;
  text-align: right;
  margin-right: 0.5rem;
  // font-weight: bold;
  font-size: 13px;
`

const CoinIcon = styled.img`
  height: 15px;
  width: 15px;
  margin-right: 1px;
  // font-size: 13px;
`
type CoinCount = {
  coinColor: string
}

const CoinCount = styled.span<CoinCount>`
  color: ${(props) => props.coinColor};
`
