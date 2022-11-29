import styled from "styled-components"

type RankingItemModalProps = {
  itemImage: string
}

const RankingItemModal = ({ itemImage }: RankingItemModalProps) => {
  return (
    <RankingItemModalWindow>
      <RankingItemModalImg src={itemImage} />
    </RankingItemModalWindow>
  )
}

export default RankingItemModal

const RankingItemModalWindow = styled.div`
  background: white;
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid #000000;
  padding: 2px;
  border-radius: 4px;
  position: absolute;
  width: 38px;
  height: 38px;
  z-index: 999;
  top: 58%;
  left: 31%;
  transform: translate(-50%, -50%);
  max-width: 95%;
`

const RankingItemModalImg = styled.img`
  width: 38px;
`
