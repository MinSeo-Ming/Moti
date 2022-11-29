import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import styled, { keyframes } from "styled-components"
import { RepoModal, RepoFiveAlertModal } from "components/repoEdit"
import { CommonNav } from "components/common"
import axios from "axios"

// 레포 없으면 레포 만들고 오라는 페이지 만들어야할듯.
//

const RepoEditPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isMouseHover, setIsMouseHover] = useState(false)
  const [repoFiveAlertModalOpen, setRepoFiveAlertModalOpen] = useState(false)
  const [repoAlertModalMessage, setRepoAlertModalMessage] = useState("")
  const showModal = () => {
    setModalOpen(true)
    console.log(modalOpen)
  }

  const Repoimg: string[] = [
    "images/repo/repo1.png",
    "images/repo/repo2.png",
    "images/repo/repo3.png",
    "images/repo/repo4.png",
    "images/repo/repo5.png",
  ]
  const [repos, setRepos] = useState([])
  useEffect(() => {
    axios
      .get("http://k7a704.p.ssafy.io:8080/api/v1/user/my-repositories", {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
        },
      })
      .then((res) => {
        let temp = res.data
        setRepos(temp)
      })
  }, [modalOpen])
  return (
    <Repo>
      <CommonNav bgColor="#5fd059;" pageTitle="사료바꾸기" linkPage="/menu" />
      {/* <Title>
        <GithubImg src="images/repo/github.png" alt="" />
        <div>
          밥그릇을 채울 레포지토리 <br />
        </div>
      </Title> */}
      <BodyContainer>
        <ButtonDiv>
          <Button
            onMouseOver={() => setIsMouseHover(true)}
            onMouseOut={() => setIsMouseHover(false)}
            onClick={() => showModal()}
          >
            {isMouseHover ? (
              <RepoImg src="images/repo/repo_full.png" />
            ) : (
              <RepoImg src="images/repo/repo1.png" />
            )}
            <ButtonTag>사료</ButtonTag>
            <ButtonTag>바꾸기</ButtonTag>
          </Button>
        </ButtonDiv>
        <RepoListBody>
          {repos.map((repo: string, i) => (
            <RepoList key={i}>
              {/* <RepoImg src={Repoimg[i]} /> */}
              {repo.length < 16 ? (
                <RepoShortNameDiv>
                  <RepoShortName>{repo}</RepoShortName>
                </RepoShortNameDiv>
              ) : (
                <RepoNameDiv>
                  <RepoName>{repo}</RepoName>
                </RepoNameDiv>
              )}
            </RepoList>
          ))}

          {modalOpen && (
            <RepoModal
              setModalOpen={setModalOpen}
              setRepoAlertModalMessage={setRepoAlertModalMessage}
              setRepoFiveAlertModalOpen={setRepoFiveAlertModalOpen}
            />
          )}
        </RepoListBody>
      </BodyContainer>
      {repoFiveAlertModalOpen ? (
        <RepoFiveAlertModal
          message={repoAlertModalMessage}
          setRepoFiveAlertModalOpen={setRepoFiveAlertModalOpen}
        />
      ) : null}
    </Repo>
  )
}

interface StyleProps {
  isMouseHover: boolean
}

const textSliding = keyframes`
0% {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
100% {
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
`

const Repo = styled.div`
  background: #c3ebae;
  border-radius: 4px;
  width: 100%;
  height: 100%;
`

const BodyContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const ButtonDiv = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  background: #ffea80;
  width: 100%;
  height: 45%;
  border: 2px solid #1b1c1f;
  border-radius: 8px;
  margin-left: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #fff8a6;
  }
`

const RepoImg = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 4px;
`

const ButtonTag = styled.div`
  width: 40px;
  height: 15px;
  font-size: 14px;
  font: bold;
  text-align: center;
  white-space: nowrap;
`

const RepoListBody = styled.div`
  width: 70%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: end;
  position: relative;
`

const RepoList = styled.div`
  width: 75%;
  height: 17px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  padding: 3px;
  margin-bottom: 5px;
  border-radius: 5px;
`

const RepoShortNameDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border: none;
  // border-bottom: solid 2px;
  overflow: hidden;
  margin-left: 5px;
  font-size: 17px;
`

const RepoShortName = styled.div`
  flex: 0 0 auto;
  white-space: nowrap;
`

const RepoNameDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border: none;
  // border-bottom: solid 2px;
  overflow: hidden;
  animation-play-state: paused;
  margin-left: 5px;
  font-size: 17px;
`

const RepoName = styled.div`
  flex: 0 0 auto;
  white-space: nowrap;
  &:hover {
    animation: ${textSliding} 6s linear infinite;
    transition: 0.1s;
  }
`

export default RepoEditPage
