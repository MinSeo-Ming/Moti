import styled from "styled-components"
import closeenessIcon from "../../assets/icons/closeness/closeness_borderless.png"

const RankingHeader = () => {
  return (
    <RankingHeaderContainer>
      <RankingHeaderRank>Rank </RankingHeaderRank>
      <RankingHeaderDate>Live </RankingHeaderDate>
      <RankingHeaderClosenessImg src={closeenessIcon} />
      <RankingHeaderClosenessDiv> Love</RankingHeaderClosenessDiv>
      <RankingHeaderMotiName>Moti Name</RankingHeaderMotiName>
    </RankingHeaderContainer>
  )
}

export default RankingHeader

const RankingHeaderContainer = styled.div`
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
  width: 98%;
  display: flex;
  fled-direction: row;
  margin-top: 1px;
`

const RankingHeaderRank = styled.div`
  font-size: 14px;
  margin-left: 2px;
  margin-right: 18px;
`

const RankingHeaderDate = styled.div`
  font-size: 14px;
`

const RankingHeaderClosenessImg = styled.img`
  width: 14px;
  margin: 0px 3px 0px 3px;
`

const RankingHeaderClosenessDiv = styled.div`
  font-size: 14px;
`

const RankingHeaderMotiName = styled.div`
  font-size: 14px;
  margin-left: 20px;
`
