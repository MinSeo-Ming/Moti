import * as React from "react"
import styled from "styled-components"
import closeenessIcon from "../../../assets/icons/closeness/closeness_borderless.png"
import RankingItemModal from "./rankingItemImgModal"

type rankingItemType = {
  rank: number
  motiName: string
  liveDays: number
  userName: string
  motiImg: string
  closeness: number
}

type RankingItemProps = {
  item: rankingItemType
}
const RankingItem = ({ item }: RankingItemProps) => {
  const [isImgModalOpen, setIsImgModalOpen] = React.useState(false)
  return (
    <RankingItemContainer>
      {item.rank > 3 ? (
        item.rank > 99 ? (
          <RankingLongIndexDiv>{item.rank}</RankingLongIndexDiv>
        ) : (
          <RankingIndexDiv>{item.rank}</RankingIndexDiv>
        )
      ) : null}
      {item.rank === 1 ? (
        <RankingIndexDiv>
          <RankingIndexImage src={"images/ranking/1st.png"} />
        </RankingIndexDiv>
      ) : null}
      {item.rank === 2 ? (
        <RankingIndexDiv>
          <RankingIndexImage src={"images/ranking/2nd.png"} />
        </RankingIndexDiv>
      ) : null}
      {item.rank === 3 ? (
        <RankingIndexDiv>
          <RankingIndexImage src={"images/ranking/3rd.png"} />
        </RankingIndexDiv>
      ) : null}
      <RankingItemUserContainer>
        <RankingMotiImage
          onMouseEnter={() => setIsImgModalOpen(true)}
          onMouseLeave={() => setIsImgModalOpen(false)}
          src={item.motiImg}
        />
        <RankingMotiDate dateColor={"#4285F4"}>{item.liveDays}</RankingMotiDate>
        <RankingClosenessImg src={closeenessIcon} />
        <RankingClosenessSpan>{item.closeness}</RankingClosenessSpan>
        <RankingNameSPan>{item.motiName}</RankingNameSPan>
      </RankingItemUserContainer>
      {isImgModalOpen ? <RankingItemModal itemImage={item.motiImg} /> : null}
    </RankingItemContainer>
  )
}

export default RankingItem

const RankingItemContainer = styled.div`
  display: flex;
  display-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`

const RankingIndexDiv = styled.div`
  width: 20px;
  white-space: nowrap;
  margin-left: 4px;
  font-size: 20px;
  text-align: center;
`

const RankingIndexImage = styled.img`
  width: 20px;
  height: 20px;
`

const RankingLongIndexDiv = styled.div`
  white-space: nowwrap;
  margin-left: 3px;
  font-size: 14px;
  text-align: center;
`

const RankingItemUserContainer = styled.div`
  width: 217px;
  height: 25px;
  background: #ffffff;
  margin: 1.5px;
  display: flex;
  display-direction: row;
  align-items: center;
  border: 2px solid #110105;
  border-radius: 7px;
`

const RankingMotiImage = styled.img`
  margin: 1.5px;
  border: 1px solid #000000;
  border-radius: 45px;
  width: 20px;
  height: 20px;
`

type RankingDateProps = {
  dateColor: string
}

const RankingMotiDate = styled.span<RankingDateProps>`
  white-space: nowrap;
  margin-left: 3px;
  margin-right: 0px;
  font-size: 15px;
  color: ${(props) => props.dateColor};
`

const RankingNameSPan = styled.span`
  white-space: nowrap;
  margin-left: 4px;
  margin-right: 4px;
  font-size: 15px;
`

const RankingClosenessImg = styled.img`
  width: 14px;
  margin-right: 2px;
`

const RankingClosenessSpan = styled.span`
  color: #c90947;
  font-size: 16px;
`
