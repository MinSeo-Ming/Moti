import styled from "styled-components"
const NoticePage = () => {
  return (
    <NoticeWindow>
      <Nav>
        <CloseButton>
          <img src="images/shop/union.png" alt="" />
        </CloseButton>
      </Nav>
      <Body>
        <ImgDiv>
          <MotiDiv>
            <MotiImg src="images/moti/motti_hungry.gif" alt="" />
          </MotiDiv>
          <BubbleDiv>
            <BubbleImg src="images/alert/moti_bubble.gif" alt="" />
          </BubbleDiv>
        </ImgDiv>
        <FooterDiv>
          <TextDiv>
            <div>모티가 배가 고파요.</div>
            <div>얼른 커밋하고 밥을 주세요!</div>
          </TextDiv>
          <CommitButton>모티 밥주기</CommitButton>
        </FooterDiv>
      </Body>
    </NoticeWindow>
  )
}

const NoticeWindow = styled.div`
  background: white;
  height: 100%;
  width: 100%;
`

const Nav = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: end;
`

const CloseButton = styled.button`
  background: none;
  border: none;
`

const Body = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImgDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const MotiImg = styled.img`
  width: 100%;
  height: 100%;
`
const BubbleImg = styled.img`
  width: 100%;
  height: 100%;
`

const BubbleDiv = styled.div`
  width: 50%;
`
const MotiDiv = styled.div`
  width: 50%;
`

const FooterDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TextDiv = styled.div`
  width: 100%;
  text-align: center;
`
const CommitButton = styled.button`
  margin-top: 5%;
  width: 60%;
  height: 50%;
`
export default NoticePage
