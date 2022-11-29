import * as React from "react"
import styled from "styled-components"
import {
  LoginPageTitle,
  LoginButtonBox,
  LoginNumberBox,
  LoginSuccessModal,
  LoginLoadingModal,
  LoginFailedModal,
} from "components/login"
import axios from "axios"
import { userAPI } from "../api"
import { useSetRecoilState } from "recoil"
import { isLoginState } from "store"

const { ipcRenderer } = window.require("electron")
const LoginPage = () => {
  const [deviceID, setDeviceID] = React.useState("")
  const [userCode, setUserCode] = React.useState("")
  const [getCode, setGetCode] = React.useState(false)
  const [currentURL, setCurrentURL] = React.useState("")
  const [successModalOpen, setSuccessModalOpen] = React.useState(false)
  const [loginLoading, setLoginLoading] = React.useState(false)
  const [loginLoadingMessage, setLoginLoadingMessage] = React.useState("")
  const [loginFailed, setLoginFailed] = React.useState(false)
  const [loginFailedMessage, setLoginFailedMessage] = React.useState("")
  const setIsLoginState = useSetRecoilState(isLoginState)
  const loginSuccess = () => {
    setIsLoginState(true)
  }
  const LoginButtonClick = async () => {
    // window.localStorage.setItem("GitToken", process.env.REACT_APP_GIT_TOKEN)
    if (window.localStorage.getItem("GitToken")) {
      try {
        await userAPI.getMotiToken(window.localStorage.getItem("GitToken")).then((res) => {
          if (window.sessionStorage.getItem("MotiToken")) {
            setSuccessModalOpen(true)
            ipcRenderer.send("LOGIN_SUCCESS", true)
          }
          if (res === 400) {
            setLoginFailedMessage("Git Server Error ...")
            setLoginFailed(true)
          }
          if (res === 500) {
            setLoginFailedMessage("Moti Server Error ...")
            setLoginFailed(true)
          }
        })
      } catch (e) {
        setLoginFailedMessage("LocalStorage Deleted ...")
        setLoginFailed(true)
        window.localStorage.removeItem("GitToken")
      }
    } else {
      axios
        .post(
          `https://github.com/login/device/code?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo%20read:user%20user:email`,
          null,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          ipcRenderer.send("LOGIN_ACTION", "login")
          ipcRenderer.on("URL_CALL", (event: any, args: any) => {
            setCurrentURL(args)
            console.log(args)
          })
          ipcRenderer.on("LOGIN_WINDOW_CLOSE", (event: any, args: any) => {
            ClearAllState()
          })
          setUserCode(res.data.user_code)
          setDeviceID(res.data.device_code)
          setGetCode(true)
        })
        .catch((err) => {
          setLoginFailedMessage("Git Server No Response ...")
          setLoginFailed(true)
        })
    }
  }
  const LoginFailedButtonFunction = () => {
    ClearAllState()
  }
  const ClearAllState = () => {
    setDeviceID("")
    setUserCode("")
    setGetCode(false)
    setCurrentURL("")
    setSuccessModalOpen(false)
    setLoginLoading(false)
    setLoginLoadingMessage("")
    setLoginFailed(false)
    setLoginFailedMessage("")
  }

  React.useLayoutEffect(() => {
    const AutoLogin = async () => {
      try {
        await userAPI.getMotiToken(window.localStorage.getItem("GitToken")).then((res) => {
          if (window.sessionStorage.getItem("MotiToken")) {
            loginSuccess()
            ipcRenderer.send("LOGIN_SUCCESS", true)
          }
          if (res === 500) {
            setLoginFailedMessage("Moti Server Error ...")
            setLoginFailed(true)
            window.localStorage.removeItem("GitToken")
          }
        })
      } catch (e) {
        setLoginFailedMessage("LocalStorage Deleted ...")
        setLoginFailed(true)
        window.localStorage.removeItem("GitToken")
      }
    }
    if (window.localStorage.getItem("GitToken")) {
      AutoLogin()
    }
  }, [])

  React.useEffect(() => {
    console.log(currentURL)
    const MotiLogin = async (gitAccessToken: string) => {
      await userAPI.getMotiToken(gitAccessToken).then((res) => {
        if (res === 200) {
          setSuccessModalOpen(true)
          setLoginLoading(false)
          setLoginLoadingMessage("")
          ipcRenderer.send("LOGIN_SUCCESS", true)
        } else {
          setLoginFailedMessage("Git Token Get Failed")
          setLoginFailed(true)
        }
      })
    }
    if (currentURL === "https://github.com/login/device/success") {
      ipcRenderer.send("HIDE_LOGIN_WINDOW", "close")
      setLoginLoadingMessage("GitToken 생성중 ...")
      setLoginLoading(true)
      userAPI
        .getGitToken(deviceID)
        .then((res) => {
          setLoginLoadingMessage("MotiToken 생성중 ...")
          MotiLogin(res)
        })
        .catch((e) => {
          setLoginFailedMessage(e.response.status)
          setLoginFailed(true)
        })
    }
    if (currentURL === "https://github.com/login/device/failure?reason=not_found") {
      ipcRenderer.send("HIDE_LOGIN_WINDOW", "close")
      setLoginFailedMessage("inValid Code Error ...")
      setLoginFailed(true)
    }
  }, [currentURL, deviceID])

  return (
    <Background>
      <LoginPageTitle />
      {getCode && userCode.length > 0 ? (
        <LoginNumberBox userCode={userCode} />
      ) : (
        <LoginButtonBox LoginButtonClick={LoginButtonClick} />
      )}
      {successModalOpen ? <LoginSuccessModal loginSuccess={loginSuccess} /> : null}
      {loginLoading ? <LoginLoadingModal message={loginLoadingMessage} /> : null}
      {loginFailed ? (
        <LoginFailedModal
          message={loginFailedMessage}
          LoginFailedButtonFunction={LoginFailedButtonFunction}
        />
      ) : null}
    </Background>
  )
}

export default LoginPage

const Background = styled.div`
  height: 100%;
  width: 100%;
  background: #e3eeff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
