import styled from 'styled-components'
import { device } from '../utils/devices'


const StepContainer = styled.div`

  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.tablet} { 
    margin: auto auto;
  }
`
const Label = styled.label`
  color: black;
  margin-bottom: 10px;
  font-weight: 300;
  font-size: 20px;
`

const InputConatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 0px 3px #ccc;
  resize: vertical;
  min-height: 10vh;
  max-height: 30vh;
  font-size: 15px;
  font-weight: 100;
  padding: 10px 10px;

  &:focus{
    outline: none !important;
    border:2px solid #2684FF;
  }
`

const Input = styled.input`
  border-radius: 5px;
  border: 1px;
  border-color: hsl(0,0%,80%);
  box-shadow: 0px 0px 3px #ccc;
  font-size: 15px;
  font-weight: 300;
  padding: 10px 10px;

  &:focus{
    outline: none !important;
    border:2px solid #2684FF;
  }

`

const CustomSelectStyles = {
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: "15px"
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "15px"
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white": "black",
    fontSize: "15px"
  }),
}

export {
    StepContainer,
    Label,
    InputConatiner,
    TextArea,
    Input,
    CustomSelectStyles
}