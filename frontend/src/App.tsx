import React, { useEffect, useState } from "react"
import "./App.css"
import { Router, AuthRouter } from "./router"
import styled, { keyframes } from "styled-components"
import DeviceFrame from "./assets/Frame.png"
import { HashRouter, Link } from "react-router-dom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  deviceColor,
  buttonColor,
  menuOnoffState,
  motiimgState,
  motiLastFeedState,
  motiState,
  isLoginState,
  ishomeState,
} from "./store"
import buttonMenu from "./assets/icons/buttons/button_menu.png"
import buttonEat from "./assets/icons/buttons/button_eat.png"
import buttonClean from "./assets/icons/buttons/button_clean.png"
import buttonPlay from "./assets/icons/buttons/button_play.png"
import Oxmire from "components/common/oxmire"
import { motiAPI } from "api"
import { motiExistState } from "store/moti"

const { ipcRenderer } = window.require("electron")
const App = () => {
  const isLogin = useRecoilValue(isLoginState)
  const [isFed, setIsFed] = useState(false)

  const checkMorning = () => {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()

    if (hour === 10 && minute === 0) {
      return true
    }
  }

  const checkEvening = () => {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    if (hour === 17 && minute === 0) {
      return true
    }
  }

  React.useEffect(() => {
    // 알림
    // 먼저 지정한 시간(10시, 17시)이 됐는지 3초에 한번씩 체크한다.
    // 지정한 시간이 됐다면 api로 밥을 줬는지 확인한다. => isFed
    // false라면 ipcRenderer.send로 알림을 보내준다
    // clearInterval로 반복되는 함수를 종료한다.

    if (isLogin) {
      const morningAlert = setInterval(() => {
        if (checkMorning()) {
          motiAPI.getWhetherFed().then(({ data }) => {
            if (!data.fedCheck) {
              ipcRenderer.send("MORNING_ALERT", "go")
              clearInterval(morningAlert)
            }
          })
        }
      }, 1000)

      const eveningAlert = setInterval(() => {
        if (checkEvening()) {
          motiAPI.getWhetherFed().then(({ data }) => {
            if (!data.fedCheck) {
              ipcRenderer.send("EVENING_ALERT", "go")
              clearInterval(eveningAlert)
            }
          })
        }
      }, 1000)
    }
  }, [isLogin])
  const [motiimg, setMotiimg] = useRecoilState(motiimgState)
  const [menuon, setMenuon] = useRecoilState(menuOnoffState)
  const devicecolor = useRecoilValue(deviceColor)
  const buttoncolor = useRecoilValue(buttonColor)
  const setMotti = useSetRecoilState(motiState)
  const [lastFeedDate, setLastFeedDate] = useRecoilState(motiLastFeedState)
  const [ishome, setIshome] = useRecoilState(ishomeState)
  const logined = useRecoilValue(isLoginState)
  const motiexist = useRecoilValue(motiExistState)

  const menuBtn = () => {
    setIshome(false)
    setMenuon(!menuon)
  }
  const eatBtn = () => {
    if (ishome === true && isLogin === true) setMotti("eatting")
  }
  const playBtn = () => {
    if (ishome === true && isLogin === true) setMotti("playing")
  }
  const showerBtn = () => {
    if (ishome === true && isLogin === true) setMotti("shower")
  }
  return (
    <HashRouter>
      <Shadowall></Shadowall>
      <Frame className="frame">
        <MainDevice bgColor={devicecolor}>
          <ShadowBox>
            <BlackBox>
              <Screen>{isLogin ? <Router /> : <AuthRouter />}</Screen>
            </BlackBox>
          </ShadowBox>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: 220,
            }}
          >
            {!motiexist ? (
              <ButtonContainer bgColor={buttoncolor}>
                <ButtonItem bgColor={buttoncolor} area-label="menu button">
                  <ButtonIcon src={buttonMenu} />
                </ButtonItem>
              </ButtonContainer>
            ) : menuon ? (
              <Link to="/" className="link" onClick={menuBtn}>
                <ButtonContainer bgColor={buttoncolor}>
                  <ButtonItem bgColor={buttoncolor} area-label="menu button">
                    <ButtonIcon src={buttonMenu} />
                  </ButtonItem>
                </ButtonContainer>
              </Link>
            ) : (
              <Link to="/menu" className="link" onClick={menuBtn}>
                <ButtonContainer bgColor={buttoncolor}>
                  <ButtonItem bgColor={buttoncolor} area-label="menu button">
                    <ButtonIcon src={buttonMenu} />
                  </ButtonItem>
                </ButtonContainer>
              </Link>
            )}

            <ButtonContainer bgColor={buttoncolor}>
              <ButtonItem onClick={eatBtn} bgColor={buttoncolor} area-label="eat button">
                <ButtonIcon src={buttonEat} />
              </ButtonItem>
            </ButtonContainer>
            <ButtonContainer bgColor={buttoncolor}>
              <ButtonItem
                onClick={showerBtn}
                bgColor={buttoncolor}
                area-label="take a shower button"
              >
                <ButtonIcon src={buttonClean} />
              </ButtonItem>
            </ButtonContainer>
            <ButtonContainer bgColor={buttoncolor}>
              <ButtonItem onClick={playBtn} bgColor={buttoncolor} area-label="play button">
                <ButtonIcon src={buttonPlay} />
              </ButtonItem>
            </ButtonContainer>
          </div>
        </MainDevice>
        <Oxmire></Oxmire>
      </Frame>
    </HashRouter>
  )
}

export default App
interface DeviceProps {
  bgColor: string
}
const MainDevice = styled.div<DeviceProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
  height: 300px;
  border-radius: 15px;
  background: ${(props) => props.bgColor};
  box-sizing: border-box;
  margin: auto;
  padding-top: 4px;
`
const ShadowBox = styled.div`
  background: #414548;
  width: 296px;
  height: 222px;
  border-radius: 5px;
  display: flex;
`
const BlackBox = styled.div`
  width: 284px;
  height: 214px;
  border-radius: 3px;
  background: #000000;
  margin: auto;
  display: flex;
`

const Screen = styled.div`
  width: 250px;
  height: 200px;
  margin: auto;
  -webkit-app-region: no-drag;
`
const Frame = styled.div`
  width: 408px;
  height: 308px;
  background-image: url(${DeviceFrame});
  display: flex;
`
const ButtonContainer = styled.div<DeviceProps>`
  position: relative;
  background-color: ${(props) => props.bgColor};
  border-radius: 90px;
  border: 0;
  border: 3px solid #414548;
  box-shadow: rgba(0, 0, 0, 0.7) 0px -4px 5px inset;
  width: 40px;
  height: 40px;
`

const ButtonItem = styled.button<DeviceProps>`
  background-color: ${(props) => props.bgColor};
  border-radius: 90px;
  border: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.5) 0px -3px 5px inset;
  top: -3px;
  align-items: center;
  justifycontent: center;
  cursor: pointer;
  &:hover {
    filter: brightness(91%);
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 5px inset;
    top: -2px;
  }
`
const ButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const Shadowall = styled.div`
  position: absolute;
  width: 400px;
  height: 300px;
  right: 4px;
  bottom: 4px;

  background: linear-gradient(270deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 18.58%),
    linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 19.81%, rgba(0, 0, 0, 0) 81.25%);
  border-radius: 14px;
  pointer-events: none;
`
