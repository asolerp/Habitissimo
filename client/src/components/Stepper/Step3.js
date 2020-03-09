import React, { useContext } from 'react'

// Global Store
import { store } from '../../store/store';

// Styles
import { StepContainer, Label, InputConatiner, Input} from '../../styles/formStyles'

const Step3 = () => {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  // useEffect(() => {
  //   console.log(globalState)
  // }, [globalState])

  return (
    <StepContainer>
      <InputConatiner>
        <Label>Nombre</Label>
        <Input 
          value={state.name} 
          placeholder="Nombre" 
          required="required" 
          pattern="[A-Za-z0-9]{1,20}" 
          onChange={(event) =>  dispatch({
            type: "name",
            value: event.target.value
          })}></Input>
      </InputConatiner>
      <InputConatiner>
        <Label>Email</Label>
        <Input 
          value={state.email} 
          placeholder="Email" 
          required="required" 
          pattern="[A-Za-z0-9]{1,20}" 
          onChange={(event) =>  dispatch({
            type: "email",
            value: event.target.value
          })}></Input>
      </InputConatiner>      
      <InputConatiner>
        <Label>Teléfono</Label>
        <Input 
          value={state.phone} 
          placeholder="Teléfono" 
          required="required" 
          pattern="[A-Za-z0-9]{1,20}" 
          onChange={(event) =>  dispatch({
            type: "phone",
            value: event.target.value
          })}></Input>
      </InputConatiner>

    </StepContainer>
  )
}

export default Step3