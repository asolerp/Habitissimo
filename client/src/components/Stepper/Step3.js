import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'


// Global Store
import { store } from '../../store/store';


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

const Input = styled.input`
  border-radius: 5px;
  border: 1px;
  border-color: hsl(0,0%,80%);
  box-shadow: 0px 0px 3px #ccc;
  font-size: 15px;
  padding: 10px 10px;

`

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
        <Input value={state.name} placeholder="Nombre" onChange={(event) =>  dispatch({
            type: "name",
            value: event.target.value
          })}></Input>
      </InputConatiner>
      <InputConatiner>
        <Label>Email</Label>
        <Input value={state.email} placeholder="Email" onChange={(event) =>  dispatch({
            type: "email",
            value: event.target.value
          })}></Input>
      </InputConatiner>      
      <InputConatiner>
        <Label>Teléfono</Label>
        <Input value={state.phone} placeholder="Teléfono" onChange={(event) =>  dispatch({
            type: "phone",
            value: event.target.value
          })}></Input>
      </InputConatiner>

    </StepContainer>
  )
}

export default Step3