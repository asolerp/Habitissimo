import React, { useContext } from 'react'

// Utils
import Select from 'react-select'

// Global Store
import { store } from '../../store/store';

// Styles

import { StepContainer, Label, InputConatiner, TextArea, CustomSelectStyles} from '../../styles/formStyles'

const options = [
  { value: 'now', label: 'Lo antes posible' },
  { value: 'close', label: 'De 1 a 3 meses' },
  { value: 'far', label: 'Más de 3 meses' }
]

const Step1 = () => {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  return (
    <form>
      <StepContainer>
          <InputConatiner>
            <Label>Descripción</Label>
            <TextArea rows={5} value={state.description} required pattern="[A-Za-z0-9]{1,20}" onChange={(event) =>  dispatch({
                type: "description",
                value: event.target.value
              })}></TextArea>
          </InputConatiner>
          <InputConatiner>
            <Label>Fecha Aproximada</Label>
            <Select value={state.date} options={options} styles={CustomSelectStyles} onChange={(selectedOption) =>  dispatch({
                type: "date",
                value: selectedOption
              })}></Select>
          </InputConatiner>
      </StepContainer>
      </form>
  )
}

export default Step1