import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
// import './datePicker.css'

// Utils
import Select from 'react-select'
// import DatePicker, {registerLocale} from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import es from 'date-fns/locale/es';
// import moment from 'moment'

// Global Store
import { store } from '../../store/store';

const options = [
  { value: 'now', label: 'Lo antes posible' },
  { value: 'close', label: 'De 1 a 3 meses' },
  { value: 'far', label: 'Más de 3 meses' }
]

const colourStyles = {
  options: styles => ({ ...styles, color: "black"  }),
  input: styles => ({ ...styles  }),
  placeholder: styles => ({ ...styles  }),
  singleValue: styles => ({ ...styles }),
};

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`

const InputConatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 0px 3px #ccc;
  resize: vertical;
  min-height: 10vh;
  max-height: 30vh;
  font-size: 15px;
  padding: 10px 10px;
`

const Input = styled.input`
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 0px 3px #ccc;
`

const Step1 = () => {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  useEffect(() => {
    console.log(globalState)
  }, [globalState])

  // useEffect(() => {
  //   localStorage.setItem("h_date", globalState.date);
  // }, [globalState.date]);




  return (
    <StepContainer>
      <InputConatiner>
        <Label>Descripción</Label>
        <TextArea rows={10} value={state.description} onChange={(event) =>  dispatch({
            type: "description",
            value: event.target.value
          })}></TextArea>
      </InputConatiner>
      <InputConatiner>
        <Label>Fecha Aproximada</Label>
        <Select value={state.date} options={options} styles={colourStyles} onChange={(selectedOption) =>  dispatch({
            type: "date",
            value: selectedOption
          })}></Select>
      </InputConatiner>

    </StepContainer>
  )
}

export default Step1