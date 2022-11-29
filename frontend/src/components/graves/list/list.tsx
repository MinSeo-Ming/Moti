import * as React from "react"
import styled from "styled-components"
import GraveCard from "./card"
import EmptyGraves from "../emptyGraves"
type graveItemType = {
  deadMotiNo: number
  motiBirth: string
  motiDeath: string
  motiGender: string
  motiName: string
  motiUrl: string
}
type props = {
  gravesList: graveItemType[]
}

const GravesListView = ({ gravesList }: props) => {
  return (
    <ListContainer>
      {gravesList.length > 0 ? (
        gravesList.map((item, i) => <GraveCard item={item} key={i} />)
      ) : (
        <EmptyGraves />
      )}
    </ListContainer>
  )
}

export default GravesListView

const ListContainer = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`
