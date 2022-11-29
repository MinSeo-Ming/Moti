import * as React from "react"
import styled from "styled-components"
import { CommonNav } from "components/common"
import {
  SettingTopBox,
  SettingColorBox,
  LogoutModal,
  WithdrawalModal,
  WithdrawalSuccessModal,
} from "../components/setting"
import { useRecoilState, useSetRecoilState } from "recoil"
import { isLoginState, buttonColor, deviceColor } from "store"
import { useNavigate } from "react-router"
import { userAPI } from "api"

const { ipcRenderer } = window.require("electron")
const SettingPage = () => {
  const setIsLoginState = useSetRecoilState(isLoginState)
  const DeviceColorPallets = [
    "#5A6078",
    "#00C3E3",
    "#FF4554",
    "#AC79AE",
    "#DFDCDD",
    "#98E294",
    "#FFE054",
    "#F37333",
    "#FFAAAA",
  ]
  const ButtonColorPallets = [
    "#5A6078",
    "#00C3E3",
    "#FF4554",
    "#AC79AE",
    "#DFDCDD",
    "#98E294",
    "#FBBC05",
    "#F37333",
    "#FFAAAA",
  ]
  const [deviceColorState, setDeviceColorState] = useRecoilState(deviceColor)
  const [buttonColorState, setButtonColorState] = useRecoilState(buttonColor)
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false)
  const [withdrawalModalOpen, setWithdrawalModalOpen] = React.useState(false)
  const [withdrawalSuccessModalOpen, setWithdrawalSuccessModalOpen] = React.useState(false)
  const [userName, setUserName] = React.useState("")
  const navigate = useNavigate()
  const doLogout = () => {
    window.sessionStorage.removeItem("MotiToken")
    window.localStorage.removeItem("GitToken")
    setIsLoginState(false)
    setDeviceColorState("#5A6078")
    setButtonColorState("#FBBC05")
    ipcRenderer.send("LOGOUT", false)
    navigate("/")
  }
  const doWithdrawal = () => {
    userAPI.deleteMotiUser().then(() => {
      setWithdrawalSuccessModalOpen(true)
    })
  }

  const withdrawalSuccess = () => {
    window.sessionStorage.removeItem("MotiToken")
    window.localStorage.removeItem("GitToken")
    setIsLoginState(false)
    setDeviceColorState("#5A6078")
    setButtonColorState("#FBBC05")
    ipcRenderer.send("LOGOUT", false)
    navigate("/")
  }
  const changeDeviceColor = (color: string) => {
    userAPI.modifyUserColor({
      deviceColor: color,
      buttonColor: buttonColorState,
    })
    setDeviceColorState(color)
  }

  const changeButtonColor = (color: string) => {
    userAPI.modifyUserColor({
      deviceColor: deviceColorState,
      buttonColor: color,
    })
    setButtonColorState(color)
  }

  React.useEffect(() => {
    if (userName === "") {
      userAPI.getUserID().then(({ data }) => {
        setUserName(data.userName)
      })
    }
  }, [])
  return (
    <SettingPageContainer>
      <CommonNav bgColor="#a1c5ff" pageTitle="환경설정" linkPage="/menu" />
      <SettingTopBox
        userName={userName}
        setLogoutModalOpen={setLogoutModalOpen}
        setWithdrawalModalOpen={setWithdrawalModalOpen}
      />
      <SettingColorBox
        DeviceColorPallets={DeviceColorPallets}
        deviceColorState={deviceColorState}
        ButtonColorPallets={ButtonColorPallets}
        buttonColorState={buttonColorState}
        changeDeviceColor={changeDeviceColor}
        changeButtonColor={changeButtonColor}
      />
      {logoutModalOpen ? (
        <LogoutModal setLogoutModalOpen={setLogoutModalOpen} doLogout={doLogout} />
      ) : null}
      {withdrawalModalOpen ? (
        <WithdrawalModal
          setWithdrawalModalOpen={setWithdrawalModalOpen}
          doWithdrawal={doWithdrawal}
        />
      ) : null}
      {withdrawalSuccessModalOpen ? (
        <WithdrawalSuccessModal withdrawalSuccess={withdrawalSuccess} />
      ) : null}
    </SettingPageContainer>
  )
}

export default SettingPage

const SettingPageContainer = styled.div`
  background: #e3eeff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`
