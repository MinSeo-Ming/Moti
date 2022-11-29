import { Background } from "./menu"
import styled, { keyframes } from "styled-components"
import { CommonNav } from "components/common"
import { useEffect, useState, useLayoutEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { motiLastFeedState } from "store/moti"
import LoadingComponent from "components/common/loading"

const StatusPage = () => {
  type MotiImg = {
    defaultImg: string
    eatingImg: string
    hungryImg: string
    message: string
    playingImg: string
    showerImg: string
  }

  type MotiInfo = {
    closeness: number
    lastFeedDay: string
    liveDays: number
    message: string
    motiBirth: string
    motiGender: string
    motiImgList: MotiImg
    motiLevel: string
    motiName: string
  }
  const [isLoading, setisLoading] = useState(true)
  const [info, setInfo] = useState<MotiInfo>()
  const [birth, setBirth] = useState<string[]>([])
  const [satiety, setSatiety] = useState(100)
  const [lastFeed, setlastFeed] = useRecoilState(motiLastFeedState)

  useLayoutEffect(() => {
    axios
      .get("http://k7a704.p.ssafy.io:8080/api/v1/moti", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("MotiToken"),
        },
      })
      .then((res) => {
        setInfo(res.data)
        setisLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (info) {
      let birthCopy = [...(info.motiBirth.split("-") as string[])]
      setBirth(birthCopy)
      let today = new Date()
      let last = Math.floor(
        Math.abs(today.getTime() - lastFeed.getTime()) / (1000 * 3600 * 24)
      )
      if (last === 2) setSatiety(0)
      else if (last === 1) {
        setSatiety(Math.round(((24 - today.getHours()) / 24) * 100))
      }
    }
  }, [info])
  if (isLoading) {
    return (
      <Background>
        <LoadingComponent></LoadingComponent>
      </Background>
    )
  } else {
    return (
      <Background>
        <CommonNav bgColor="#a1c5ff" pageTitle="상태" linkPage="/menu" />
        {info ? (
          <MotiWrapper>
            <ImgStat>
              <MotiRoom>
                <MotiGender
                  src={`images/gender/${info.motiGender}.png`}
                  alt="gender"
                />
                <MotiImage src={info.motiImgList.defaultImg} alt="moti" />
              </MotiRoom>
              <MotiStatus>
                <GaugeTitle>🍖포만감</GaugeTitle>
                <GaugeBack>
                  <Percentage>{satiety}%</Percentage>
                  <Satiety satiety={satiety}></Satiety>
                </GaugeBack>
                <GaugeTitle>💗애정도</GaugeTitle>
                <GaugeBack>
                  <Percentage>{info.closeness}%</Percentage>
                  <Closeness closeness={info.closeness as number}></Closeness>
                </GaugeBack>
              </MotiStatus>
            </ImgStat>
            <MotiName>
              {info.motiName}({info.motiLevel}단계)
            </MotiName>
            <MotiBirth>
              생년월일🎉
              <br /> &nbsp; {birth[0]}년 {birth[1]}월 {birth[2]}일(
              {info.liveDays}
              일)
            </MotiBirth>
          </MotiWrapper>
        ) : null}
      </Background>
    )
  }
}

export default StatusPage

const MotiWrapper = styled.div`
  margin: 0 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const ImgStat = styled.div`
  display: flex;
  align-items: center;
`

const MotiRoom = styled.div`
  width: 79px;
  height: 79px;
  position: relative;
`

const MotiImage = styled.img`
  width: 75px;
  height: 75px;
  background: lightblue;
  // background: white;
  border-radius: 5px;
  border: solid 2px skyblue;
`
const MotiGender = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 4px;
  top: 4px;
`

const MotiStatus = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 10px;
`

const GaugeTitle = styled.div`
  font-size: 12px;
`

const GaugeBack = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  background: white;
  width: 120px;
  height: 20px;
  border-radius: 6px;
  border: solid 2px lightgray;
  padding: 0 2px;
`

const Percentage = styled.p`
  position: absolute;
  width: 120px;
  text-align: center;
  color: white;
  font-size: 13px;
  margin-top: 14px;
  text-shadow: 1px 1px 1px black;
  // -webkit-text-stroke: 0.1px gray;
`

const Progress = (percent: number) => keyframes`
  from {
    width: 0;
  }
  to {
    width: ${percent}%;
  }
`

const Satiety = styled.div<{ satiety: number }>`
  // background: linear-gradient(white, green, green, green);
  background: green;
  width: ${(props) => props.satiety}%;
  height: 16px;
  border-radius: 4px;
  animation: ${(props) => Progress(props.satiety)} 1.5s ease-in-out;
`

const Closeness = styled.div<{ closeness: number }>`
  // background: linear-gradient(white, tomato, tomato, tomato);
  background: tomato;
  width: ${(props) => props.closeness}%;
  height: 16px;
  border-radius: 4px;
  animation: ${(props) => Progress(props.closeness)} 1.5s ease-in-out;
`

const MotiName = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const MotiBirth = styled.div`
  color: green;
`
