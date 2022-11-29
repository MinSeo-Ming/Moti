import styled from "styled-components"
import RankingItem from "./rankingItem"

type rankingItemType = {
  rank: number
  motiName: string
  liveDays: number
  userName: string
  motiImg: string
  closeness: number
}

type props = {
  rankingList: rankingItemType[]
}
const RankingList = ({ rankingList }: props) => {
  return (
    <RankingListConatainer>
      {rankingList.map((item) => (
        <RankingItem key={item.rank} item={item} />
      ))}
    </RankingListConatainer>
  )
}

export default RankingList

const RankingListConatainer = styled.div`
  margin-top: 3px;
  padding-top: 2.8px;
  padding-bottom: 12px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`
