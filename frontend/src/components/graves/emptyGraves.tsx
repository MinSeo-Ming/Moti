import styled from "styled-components"

const EmptyGraves = () => {
  return (
    <EmptyGravesContainer>
      <EmptyGravesTitle>죽은 모티가</EmptyGravesTitle>
      <EmptyGravesTitle>아직 없습니다!</EmptyGravesTitle>
    </EmptyGravesContainer>
  )
}

export default EmptyGraves

const EmptyGravesContainer = styled.div`
  background: #eeeeee;
  border: 2px solid #000000;
  margin: 10px;
  width: 80%;
  height: 150px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const EmptyGravesTitle = styled.span`
  font-size: 20px;
`
