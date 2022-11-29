import * as React from "react"
import GraveSlide from "./slide"
import styled from "styled-components"
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

const GravesCarouselView = ({ gravesList }: props) => {
  const TOTAL_SLIDES = gravesList.length - 1
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const slideRef = React.useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
  }

  React.useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out"
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`
    }
  }, [currentSlide])

  return (
    <Container>
      <Button onClick={prevSlide}>{"<"}</Button>
      {gravesList.length > 0 ? (
        <CarouselContainer>
          <SliderContainer ref={slideRef}>
            {gravesList.map((item, i) => (
              <GraveSlide item={item} key={i} />
            ))}
          </SliderContainer>
        </CarouselContainer>
      ) : (
        <EmptyGraves />
      )}
      <Button onClick={nextSlide}>{">"}</Button>
    </Container>
  )
}

export default GravesCarouselView

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const CarouselContainer = styled.div`
  width: 80%;
  height: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 0;
`
const Button = styled.button`
  all: unset;
  cursor: pointer;
  float: left;
  color: #ffffff;
  font-size: 30px;
  width: auto;
  height: 40%;
  margin: auto;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #cdd1ff;
  }
`
const SliderContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  float: left;
`
