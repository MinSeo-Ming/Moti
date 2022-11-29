import styled, { keyframes } from "styled-components"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  motiimgState,
  motiLastFeedState,
  motiState,
  coinState,
  deviceColor,
  buttonColor,
  ishomeState,
} from "../store"
import { useEffect, useState } from "react"
import axios from "axios"
import closenessIcon from "../assets/icons/closeness/closeness_borderless.png"
import { userAPI } from "api"
import { useNavigate, useLocation } from "react-router"
import { motiExistState } from "store/moti"

const MainPage = () => {
  const [motistate, setMotistate] = useRecoilState(motiState)
  const [coinEatMotion, setCoinEatMotion] = useState(false)
  const [HeartMotion, setHeartMotion] = useState(false)
  const [lastFeed, setlastFeed] = useRecoilState(motiLastFeedState)
  const [openModal, setOpenModal] = useState<number>(0)
  const [motiimg, setMotiimg] = useState<string>("")
  const Navigate = useNavigate()
  const [motiInfo, setMotiInfo] = useRecoilState(motiimgState)
  const [openCloseModal, setOpenCloseModal] = useState(false)
  const [coin, setCoin] = useRecoilState(coinState)
  const [deviceColorState, setDeviceColorState] = useRecoilState(deviceColor)
  const [buttonColorState, setButtonColorState] = useRecoilState(buttonColor)
  const [backgroundNo, setBackgroundNo] = useState(0)
  const location = useLocation()
  const [ishome, setIshome] = useRecoilState(ishomeState)
  const [motiexist, setMotiExist] = useRecoilState(motiExistState)
  let init: number = 0
  const motiRoomURL = [
    "images/room/room_night.png",
    "images/room/room_morning.png",
    "images/room/room_afternoon.png",
    "images/room/room_evening.png",
  ] //밤,새벽,낮,저녁
  const checkEvo = () => {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    if (hour === 1 && minute === 0) {
      return true
    }
  }
  const checkTime = () => {
    const hour = new Date().getHours()
    return Math.floor(hour / 6)
  }

  const motiimgChange = () => {
    let today = new Date()
    if (Math.floor(Math.abs(today.getTime() - lastFeed.getTime()) / (1000 * 3600 * 24)) === 2) {
      setMotistate("hungry")
    } else {
      setMotistate("default")
    }
  }

  useEffect(() => {
    motiimgChange()
  }, [lastFeed])
  useEffect(() => {
    setIshome(true)
    setMotiExist(false)
    setBackgroundNo(checkTime)
    axios
      .get("http://k7a704.p.ssafy.io:8080/api/v1/moti", {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
        },
      })
      .then((res) => {
        if (res.data === "") {
          setIshome(false)
          Navigate("/createEgg")
        } else {
          setMotiInfo({
            default: res.data.motiImgList.defaultImg,
            eatting: res.data.motiImgList.eatingImg,
            playing: res.data.motiImgList.playingImg,
            shower: res.data.motiImgList.showerImg,
            hungry: res.data.motiImgList.hungryImg,
          })
          setMotiExist(true)
          setlastFeed(new Date(res.data.lastFeedDay + " 00:00:00"))
        }
      })
      .catch((err) => {
        if (err.response.status === 406) {
          setIshome(false)
          Navigate("/createEgg")
        }
      })
    axios
      .get("http://k7a704.p.ssafy.io:8080/api/v1/item/goods", {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
        },
      })
      .then((res) => {
        setCoin(res.data.userGoods.COIN)
      })
    userAPI.getUserColor().then(({ data }) => {
      setDeviceColorState(data.deviceColor)
      setButtonColorState(data.buttonColor)
    })
    init++
  }, [])
  useEffect(() => {
    const evolutionCheck = setInterval(() => {
      if (checkEvo()) {
        axios
          .get("http://k7a704.p.ssafy.io:8080/api/v1/moti", {
            headers: {
              Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
            },
          })
          .then((res) => {
            if (res.data === "") {
              setIshome(false)
              Navigate("/createEgg")
            } else {
              setMotiInfo({
                default: res.data.motiImgList.defaultImg,
                eatting: res.data.motiImgList.eatingImg,
                playing: res.data.motiImgList.playingImg,
                shower: res.data.motiImgList.showerImg,
                hungry: res.data.motiImgList.hungryImg,
              })
              setlastFeed(new Date(res.data.lastFeedDay + " 00:00:00"))
            }
          })
          .catch((err) => {
            if (err.response.status === 406) {
              setIshome(false)
              Navigate("/createEgg")
            }
          })
        clearInterval(evolutionCheck)
      }
    }, 600000)
  }, [motiInfo])
  useEffect(() => {
    //moti 상태에따른 메인 출력
    switch (motistate) {
      case "eatting": {
        if (location.pathname !== "/") return
        //밥주기
        axios
          .post("http://k7a704.p.ssafy.io:8080/api/v1/moti/food", null, {
            headers: {
              Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
            },
          })
          .then((res) => {
            console.log(res.data)
            if (res.status === 204) {
              setOpenModal(res.status)
              setMotistate("default")
            }
            if (res.status === 200) {
              setMotiimg(motiInfo.eatting)
              window.setTimeout(() => {
                setlastFeed(new Date())
              }, 4000)
              if (res.data.tokens !== 0) {
                let temp = coin + res.data.tokens
                setCoinEatMotion(true)
                setCoin(temp)
              } else {
                setOpenModal(201)
              }
            }
          })
          .catch((err) => {
            if (err === 400) {
              setOpenModal(err)
            }
          })

        break
      }
      case "playing": {
        axios
          .post("http://k7a704.p.ssafy.io:8080/api/v1/moti/play-moti", null, {
            headers: {
              Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
            },
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              setHeartMotion(true)
            }
            if (res.data.statusCode === 204) {
              setOpenCloseModal(true)
            }
          })
        setMotiimg(motiInfo.playing)
        window.setTimeout(motiimgChange, 4000)
        break
      }
      case "shower": {
        axios
          .post("http://k7a704.p.ssafy.io:8080/api/v1/moti/clean-moti", null, {
            headers: {
              Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
            },
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              setHeartMotion(true)
            }

            if (res.data.statusCode === 204) {
              setOpenCloseModal(true)
            }
          })
        setMotiimg(motiInfo.shower)
        window.setTimeout(motiimgChange, 4000)
        break
      }
      case "hungry": {
        setMotiimg(motiInfo.hungry)
        setCoinEatMotion(false)
        setHeartMotion(false)
        break
      }

      default: {
        setMotiimg(motiInfo.default)
        setCoinEatMotion(false)
        setHeartMotion(false)
      }
    }
  }, [motistate, motiInfo])
  return (
    <Main backimgurl={motiRoomURL[backgroundNo]}>
      {motiimg !== "" ? <Moti src={motiimg} alt="moti"></Moti> : null}
      {coinEatMotion ? <CoinEat src="images/shop/coin.png"></CoinEat> : null}
      {HeartMotion ? <CoinEat src={closenessIcon}></CoinEat> : null}
      {openModal !== 0 ? (
        <AlertModal
          setOpenModal={setOpenModal}
          modalNo={openModal}
          setOpenCloseModal={setOpenCloseModal}
        ></AlertModal>
      ) : undefined}
      {openCloseModal !== false ? (
        <LoveAlertModal
          setOpenCloseModal={setOpenCloseModal}
          setOpenModal={setOpenModal}
        ></LoveAlertModal>
      ) : null}
    </Main>
  )
}

//alert모달

const AlertModal = (props: any) => {
  const ok = () => {
    props.setOpenModal(0)
  }
  useEffect(() => {
    props.setOpenCloseModal(false)
  }, [])

  switch (props.modalNo) {
    case 204:
      return (
        //204코드 커밋 x 밥먹기시도
        <ModalWindow>
          <Textdiv>완료된 커밋이 없습니다.</Textdiv>
          <Textdiv>커밋 이후에 시도해주세요.</Textdiv>
          <ItemButton onClick={ok} style={{ background: "#639deb" }}>
            확인
          </ItemButton>
        </ModalWindow>
      )
    case 201:
      return (
        <ModalWindow>
          <Textdiv>오늘은 더이상 코인을</Textdiv>
          <Textdiv>획득할 수 없습니다.</Textdiv>
          <ItemButton onClick={ok} style={{ background: "#639deb" }}>
            확인
          </ItemButton>
        </ModalWindow>
      )
    case 400:
      return (
        <ModalWindow>
          <Textdiv>밥그릇이</Textdiv>
          <Textdiv>존재하지 않습니다.</Textdiv>
          <ItemButton onClick={ok} style={{ background: "#639deb" }}>
            확인
          </ItemButton>
        </ModalWindow>
      )
    case 200:
      return <div></div>
    case 0:
      return <div></div>
    default:
      return (
        <ModalWindow>
          <Textdiv>errorNo : {props.modalNo}</Textdiv>
          <ItemButton onClick={ok} style={{ background: "#639deb" }}>
            확인
          </ItemButton>
        </ModalWindow>
      )
  }
}

const LoveAlertModal = (props: any) => {
  const ok = () => {
    props.setOpenCloseModal(false)
  }
  useEffect(() => {
    props.setOpenModal(0)
  }, [])

  return (
    <ModalWindow>
      <Textdiv>오늘은 더 이상</Textdiv>
      <Textdiv>애정도가 오르지 않습니다.</Textdiv>
      <ItemButton onClick={ok} style={{ background: "#639deb" }}>
        확인
      </ItemButton>
    </ModalWindow>
  )
}

const boxFade = keyframes`
  from {
    opacity: 1;
    top:140px;
  }
  to {
    opacity: 0;
    top:100px;
  }
`
interface motiroom {
  backimgurl: string
}
const CoinEat = styled.img`
  position: absolute;
  left: 260px;
  width: 24px;
  height: 24px;
  animation: ${boxFade} 1.5s;
  animation-fill-mode: forwards;
`
const Moti = styled.img`
  width: 200px;
  height: 200px;
  margin: auto;
  display: flex;
  border-radius: 3px;
`
const Main = styled.div<motiroom>`
  width: 250px;
  height: 200px;
  border-radius: 4px;
  background-image: url(${(props) => props.backimgurl});
  background-repeat: no-repeat;
  background-size: contain;
`
const ModalWindow = styled.div`
  width: 50%;
  height: 30%;
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
  align-items: center;
  padding-top: 20px;
`
const Textdiv = styled.div`
  margin: auto;
  text-align: center;
`
const ItemButton = styled.button`
  border-radius: 5px;
  color: white;
  height: 30px;
  width: 60px;
  margin-bottom: 15px;
  padding: 0;
  box-shadow: 1px 1px 0.6px #000000;
  margin: auto;
  cursor: pointer;
`

export default MainPage
