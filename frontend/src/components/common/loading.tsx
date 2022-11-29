import styled from "styled-components"

const LoadingComponent = () => {
  return <Loadingimg src="images/loading.gif"></Loadingimg>
}
export default LoadingComponent

const Loadingimg = styled.img`
  width: 50%;
  height: 50%;
  display: flex;
  margin: auto;
  object-fit: cover;
`
