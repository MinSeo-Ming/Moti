import styled, { keyframes } from "styled-components"

type repoFiveAlertModalProps = {
  message: string
  setRepoFiveAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RepoFiveAlertModal = ({ message, setRepoFiveAlertModalOpen }: repoFiveAlertModalProps) => {
  return (
    <RepoFiveAlertModalWindow>
      <RepoFiveAlertModalTitle>{message}</RepoFiveAlertModalTitle>
      <RepoFiveAlertModalButton onClick={() => setRepoFiveAlertModalOpen(false)}>
        확인
      </RepoFiveAlertModalButton>
    </RepoFiveAlertModalWindow>
  )
}

export default RepoFiveAlertModal

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const RepoFiveAlertModalWindow = styled.div`
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

const RepoFiveAlertModalTitle = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 5px;
`

const RepoFiveAlertModalButton = styled.button`
  border-radius: 4px;
  color: #ffffff;
  width: 60px;
  height: 30px;
  background: #ed6f6d;
  padding: 0;
  box-shadow: 1px 1px 0.6px #000000;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
  &:hover {
    filter: brightness(80%);
  }
`
