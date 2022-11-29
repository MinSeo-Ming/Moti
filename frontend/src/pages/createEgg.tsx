import { useState } from "react"
import styled, { keyframes } from "styled-components"
import axios from "axios"
import { RepoModal, RepoFiveAlertModal } from "components/createEgg"
import { useNavigate } from "react-router"

const CreateEggPage = () => {
  // alert창
  // validation(?), 욕설필터링..
  const [nickname, setNickName] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [alertModalOpen, setAlertModalOpen] = useState(false)
  const [repoFiveAlertModalOpen, setRepoFiveAlertModalOpen] = useState(false)
  const [repoAlertModalMessage, setRepoAlertModalMessage] = useState("")
  const Navigate = useNavigate()
  const showModal = () => {
    nickname.length < 2 ? setAlertModalOpen(true) : setModalOpen(true)
  }

  const AlertModal = () => {
    return (
      <AlertModalWindow>
        <AlertTitleDiv>
          두 글자 이상
          <br />
          입력해주세요!
        </AlertTitleDiv>
        <AlertButton
          onClick={() => {
            setAlertModalOpen(false)
          }}
        >
          취소
        </AlertButton>
      </AlertModalWindow>
    )
  }

  return (
    <Egg>
      <Body>
        <Textdiv>모티의 이름을 입력해주세요</Textdiv>
        <ImageDiv>
          <Image src="images/moti/egg.gif" alt="" />
        </ImageDiv>
      </Body>
      <InputDiv>
        <Input type="text" autoFocus onChange={(e) => setNickName(e.target.value)} maxLength={8} />
        <Button onClick={showModal}>확인</Button>
        {modalOpen && (
          <RepoModal
            setModalOpen={setModalOpen}
            nickname={nickname}
            Navigate={Navigate}
            setRepoAlertModalMessage={setRepoAlertModalMessage}
            setRepoFiveAlertModalOpen={setRepoFiveAlertModalOpen}
          />
        )}
        {alertModalOpen && <AlertModal />}
        {repoFiveAlertModalOpen ? (
          <RepoFiveAlertModal
            message={repoAlertModalMessage}
            setRepoFiveAlertModalOpen={setRepoFiveAlertModalOpen}
          />
        ) : null}
      </InputDiv>
    </Egg>
  )
}

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const Egg = styled.div`
  background: #e3eeff;
  border-radius: 4px;
  width: 100%;
  height: 100%;
`
const Textdiv = styled.div`
  margin: 18px 0 15px 0;
  font-size: 17px;
`
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1em;
`

const ImageDiv = styled.div`
  width: 100%;
  height: 30%;
  margin: 3px 0 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 120px;
  height: 90px;
`

const InputDiv = styled.div`
  width: 70%;
  height: 15%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background: none;
  margin: auto;
  margin-top: 8px;
`
const Input = styled.input`
  width: 90%;
  margin: 4%;
  border: none;
  border-bottom: solid 2px;
  background: none;
  font-size: 17px;
  spellcheck: false;
  &:focus {
    outline: none;
  }
`
const Button = styled.button`
  width: 60px;
  height: 30px;
  border: solid 2px;
  border-radius: 5px;
  cursor: pointer;
  background: #e3eeff;
  font-size: 13px;
  &:hover {
    filter: brightness(80%);
  }
`

const AlertModalWindow = styled.div`
  width: 50%;
  height: 50%;
  background: white;
  box-shadow: 1px 1px 3px;
  border: solid 2px #000000;
  border-radius: 4px;
  z-index: 999;
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 0.25s linear;
  align-items: center;
`

const AlertTitleDiv = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 5px;
`

const AlertButton = styled.button`
  border-radius: 4px;
  font-size: 16px;
  padding: 0;
  width: 60px;
  height: 30px;
  background: #639edb;
  cursor: pointer;
  margin-top: 25px;
  color: #ffffff;
  box-shadow: 1px 1px 0.6px #000000;
  &:hover {
    filter: brightness(80%);
  }
`

export default CreateEggPage
