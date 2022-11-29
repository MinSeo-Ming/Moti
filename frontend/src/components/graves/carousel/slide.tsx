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

const GraveSlide = ({ item }: props) => {
  const constraintName = item.motiName.length > 6 ? item.motiName.slice(0, 6) + ".." : item.motiName

  const [isNameOpen, setIsNameOpen] = React.useState(false)

  return (
    <SlideCardContainer>
      <MotiInfoContainer>
        <MotiName
          onMouseEnter={() => setIsNameOpen(true)}
          onMouseLeave={() => setIsNameOpen(false)}
        >
          {constraintName}
        </MotiName>
        {item.motiGender === "male" ? <GenderImg src={maleIcon} /> : <GenderImg src={femaleIcon} />}
      </MotiInfoContainer>
      <DateContainer>
        {item.motiBirth} ~ {item.motiDeath}
      </DateContainer>
      <ImgContainer>
        <FilterDiv />
        <MotiImg src={item.motiUrl} />
      </ImgContainer>
      {isNameOpen && item.motiName.length > 6 ? <NameModal name={item.motiName} /> : null}
    </SlideCardContainer>
  )
}

type ModalProps = {
  name: string
}

const NameModal = ({ name }: ModalProps) => {
  return (
    <ModalWindow>
      <ItemText>{name}</ItemText>
    </ModalWindow>
  )
}

export default GraveSlide

const SlideCardContainer = styled.div`
  background: #eeeeee;
  border: 2px solid #000000;
  margin: 10px;
  height: 100%;
  border-radius: 10px;
  position: relative;
`

const MotiInfoContainer = styled.div`
  width: 176px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MotiName = styled.span`
  margin: 4px;
  font-size: 20px;
  float: left;
`

const GenderImg = styled.img`
  width: 22px;
`

const DateContainer = styled.div`
  font-size: 14px;
  text-align: center;
`

const ImgContainer = styled.div`
  width: 80%;
  height: 65%;
  margin: auto;
  margin-top: 2px;
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
  display: paused;
  width: 100px;
`
const ModalWindow = styled.div`
  background: white;
  box-shadow: 1px 2px 2px;
  border: 2px solid #000000;
  border-radius: 4px;
  position: absolute;
  top: 26%;
  left: 45%;
  transform: translate(-50%, -50%);
  max-width: 95%;
`

const ItemText = styled.div`
  white-space: nowrap;
  margin: 2px;
  padding: 2px;
  font-size: 18px;
`
