import styled from 'styled-components'
import { device } from '../../utils/devices'

const StepperPage = styled.div`
  height: 90vh;
  padding: 0px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Title = styled.h1`
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: 200;
  margin: 15px 0px;
`

const TopSection = styled.div`
  height: 10%;

  @media ${device.tablet} { 
    width: 60%;
    margin: 0 auto;
  }
`
const MiddleSection = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media ${device.tablet} { 
    width: 60%;
  }

  @media ${device.laptop} { 
    width: 40%;
  }

`
const BottomSection = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StepButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 15px;
  background-color: #2684FF;
  width: 100%;
  border: 0;
  border-radius: 5px;
  color: white;
  font-size: 20px;
`

const BackButton = styled.p`
  color: black;
  font-weight: 300;
  font-size: 20px;
  cursor: default;
`

const Error = styled.p`
  text-align: center;
  color: #990000;
  font-size: 15px;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.5);
`

const ModalText = styled.p`
  color: white;
  text-align: center;
  font-size: 15px;
`

export {
    StepperPage,
    Title,
    TopSection,
    MiddleSection,
    BottomSection,
    StepButtons,
    Button,
    BackButton,
    Error,
    ModalText
}