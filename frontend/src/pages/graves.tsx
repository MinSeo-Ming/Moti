import { motiAPI } from "api"
import LoadingComponent from "components/common/loading"
import * as React from "react"
import styled from "styled-components"
import { CommonNav } from "../components/common"
import { GravesCarouselView, GravesListView } from "../components/graves"

type graveItemType = {
  deadMotiNo: number
  motiBirth: string
  motiDeath: string
  motiGender: string
  motiName: string
  motiUrl: string
}

const GravesPage = () => {
  const [gravesList, setGravesList] = React.useState<graveItemType[]>([])
  const [toggle, setToggle] = React.useState(false)
  const clickedToggle = () => {
    setToggle((prev) => !prev)
  }
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    motiAPI.getDeadMotiList().then((res) => {
      if (res.status === 200) {
        setGravesList(res.data)
      } else if (res.status === 204) {
        setGravesList([])
      }
      setIsLoading(false)
    })
  }, [])
  if (isLoading) {
    return (
      <GravesContainer>
        <CommonNav linkPage="/menu" bgColor="#5a5f70" pageTitle="무덤" fontColor="#ffffff" />
        <LoadingComponent></LoadingComponent>
      </GravesContainer>
    )
  } else {
    return (
      <GravesContainer>
        <CommonNav linkPage="/menu" bgColor="#5a5f70" pageTitle="무덤" fontColor="#ffffff" />
        {gravesList.length > 0 ? (
          <ToggleContainer>
            <ToggleBtn onClick={clickedToggle} toggle={toggle}>
              <Circle toggle={toggle} />
            </ToggleBtn>
          </ToggleContainer>
        ) : null}
        {!toggle ? (
          gravesList ? (
            <GravesListView gravesList={gravesList} />
          ) : null
        ) : gravesList ? (
          <GravesCarouselView gravesList={gravesList} />
        ) : null}
      </GravesContainer>
    )
  }
}
export default GravesPage

interface StyleProps {
  toggle: boolean
}

const GravesContainer = styled.div`
  background: #282b33;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`

const ToggleContainer = styled.div`
  position: absolute;
  top: 34px;
  left: 30%;
`
const ToggleBtn = styled.button<StyleProps>`
  width: 40px;
  height: 12px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "#ffaaaa" : "#cdd1ff")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
`
const Circle = styled.div<StyleProps>`
  background-color: white;
  width: 17px;
  height: 17px;
  border-radius: 50px;
  position: absolute;
  left: 3%;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(21px, 0);
      transition: all 0.2s ease-in-out;
    `}
`
