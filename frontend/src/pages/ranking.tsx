import * as React from "react"
import { CommonNav } from "components/common"
import styled from "styled-components"
import { RankingList, RankingHeader, MyRanking } from "../components/ranking"
import { motiAPI } from "api"
import LoadingComponent from "components/common/loading"

type rankingItemType = {
  rank: number
  motiName: string
  liveDays: number
  userName: string
  motiImg: string
  closeness: number
}

const RankingPage = () => {
  const [myRanking, setMyRanking] = React.useState<rankingItemType>()
  const [rankList, setRankingList] = React.useState<rankingItemType[]>([])
  const emptyMyRanking: rankingItemType = {
    rank: 999,
    motiName: "아직 모티가 없어요!",
    liveDays: 0,
    userName: "",
    motiImg: "",
    closeness: 0,
  }
  const [isLoading, setisLoading] = React.useState(true)
  React.useEffect(() => {
    motiAPI.getRanking().then(({ data }) => {
      setRankingList(data.rankings)
      setMyRanking(data.myRanking)
      setisLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <Background>
        <LoadingComponent></LoadingComponent>
      </Background>
    )
  } else {
    return (
      <Background>
        <CommonNav bgColor="#ffadd0" linkPage="/menu" pageTitle="랭킹" />
        <RankingHeader />
        {myRanking ? (
          <MyRanking myRankingInfo={myRanking} />
        ) : (
          <MyRanking myRankingInfo={emptyMyRanking} />
        )}
        {rankList.length > 0 ? <RankingList rankingList={rankList} /> : null}
      </Background>
    )
  }
}

const Background = styled.div`
  height: 100%;
  width: 100%;
  background: #feebf3;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default RankingPage
