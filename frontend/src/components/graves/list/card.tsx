import * as React from "react"
import styled from "styled-components"
import maleIcon from "../../../assets/icons/gender/male.png"
import femaleIcon from "../../../assets/icons/gender/female.png"

type graveItemType = {
  deadMotiNo: number
  motiBirth: string
  motiDeath: string
  motiGender: string
  motiName: string
  motiUrl: string
}
type props = {
  item: graveItemType
}

const GraveCard = ({ item }: props) => {
  return (
    <CardContainer>
      <MotiImgContainer>
        <FilterDiv />
        <MotiImg src={item.motiUrl} />
      </MotiImgContainer>
      <MotiInfoContainer>
        <MotiNameContainer>
          <MotiName>{item.motiName}</MotiName>
          {item.motiGender === "male" ? (
            <GenderImg src={maleIcon} />
          ) : (
            <GenderImg src={femaleIcon} />
          )}
        </MotiNameContainer>
        <MotiDateContainer>
          <MotiDateDiv>From {item.motiBirth}</MotiDateDiv>
          <MotiDateDiv>To {item.motiDeath}</MotiDateDiv>
        </MotiDateContainer>
      </MotiInfoContainer>
    </CardContainer>
  )
}

export default GraveCard

const CardContainer = styled.div`
  width: 85%;
  margin: 3px;
  border-radius: 4px;
  height: 100%;
  background: #eeeeee;
  border: 2px solid #000000;
  display: flex;
  flex-direction: row;
`

const MotiImgContainer = styled.div`
  margin: 2px;
  text-align: center;
  border: 2px solid #000000;
  border-radius: 5px;
  position: relative;
  filter: grayscale(100);
`

const FilterDiv = styled.div`
  position: absolute;
  background: #000000;
  top: -1px;
  width: 101%;
  height: 101%;
  opacity: 25%;
`

const MotiImg = styled.img`
  width: 40px;
  display: paused;
`

const MotiInfoContainer = styled.div`
  width: 176px;
  display: flex;
  flex-direction: column;
`
const MotiNameContainer = styled.div``

const MotiName = styled.span`
  margin: 4px;
  font-size: 14px;
  float: left;
`
const GenderImg = styled.img`
  width: 18px;
`

const MotiDateContainer = styled.div`
  text-align: right;
  margin-right: 10px;
`

const MotiDateDiv = styled.div`
  font-size: 15px;
`
