import styled from "styled-components"
import closeenessIcon from "../../assets/icons/closeness/closeness_borderless.png"
type rankingItemType = {
  rank: number
  motiName: string
  liveDays: number
  userName: string
  motiImg: string
  closeness: number
}

type MyRankingProps = {
  myRankingInfo: rankingItemType
}

const MyRanking = ({ myRankingInfo }: MyRankingProps) => {
  return (
    <MyRankingContainer>
      {myRankingInfo.rank > 3 ? (
        myRankingInfo.rank > 99 ? (
          <MyMotiLongIndexDiv>{myRankingInfo.rank}</MyMotiLongIndexDiv>
        ) : (
          <MyMotiIndexDiv>{myRankingInfo.rank}</MyMotiIndexDiv>
        )
      ) : null}
      {myRankingInfo.rank === 1 ? (
        <MyMotiIndexDiv>
          <MyMotiIndexImage src={"images/ranking/1st.png"} />
        </MyMotiIndexDiv>
      ) : null}
      {myRankingInfo.rank === 2 ? (
        <MyMotiIndexDiv>
          <MyMotiIndexImage src={"images/ranking/2nd.png"} />
        </MyMotiIndexDiv>
      ) : null}
      {myRankingInfo.rank === 3 ? (
        <MyMotiIndexDiv>
          <MyMotiIndexImage src={"images/ranking/3rd.png"} />
        </MyMotiIndexDiv>
      ) : null}
      <UserInfoContainer>
        {myRankingInfo.motiImg !== "" ? <MyMotiImage src={myRankingInfo.motiImg} /> : null}
        <MyMotiDateSpan>{myRankingInfo.liveDays}</MyMotiDateSpan>
        <MyMotiClosenessImg src={closeenessIcon} />
        <MyMotiClosenessSpan>{myRankingInfo.closeness}</MyMotiClosenessSpan>
        <MyMotiNameSPan>{myRankingInfo.motiName}</MyMotiNameSPan>
      </UserInfoContainer>
    </MyRankingContainer>
  )
}

export default MyRanking

const MyRankingContainer = styled.div`
  display: flex;
  display-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 0px;
`

const UserInfoContainer = styled.div`
  width: 217px;
  background: #fff3d4;
  margin: 1.5px;
  margin-left: 3px;
  display: flex;
  display-direction: row;
  align-items: center;
  border: 2px solid #110105;
  border-radius: 7px;
`

const MyMotiIndexImage = styled.img`
  width: 22px;
  height: 22px;
`

const MyMotiIndexDiv = styled.div`
  width: 20px;
  white-space: nowrap;
  margin-left: 4px;
  font-size: 20px;
  text-align: center;
`

const MyMotiLongIndexDiv = styled.div`
  white-space: nowrap;
  margin-left: 3px;
  font-size: 14px;
  text-align: center;
`

const MyMotiImage = styled.img`
  background: #ffffff;
  margin: 1.5px;
  border: 1px solid #000000;
  border-radius: 45px;
  width: 22px;
  height: 22px;
`

const MyMotiDateSpan = styled.span`
  white-space: nowrap;
  margin-left: 3px;
  margin-right: 1px;
  font-size: 15px;
  color: #4285f4;
`

const MyMotiNameSPan = styled.span`
  white-space: nowrap;
  margin-left: 4px;
  font-size: 15px;
  margin-right: 4px;
`

const MyMotiClosenessImg = styled.img`
  width: 14px;
  margin-right: 2px;
`

const MyMotiClosenessSpan = styled.span`
  margin-right: 3px;
  color: #c90947;
  font-size: 15px;
`
