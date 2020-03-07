import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 0px 3px #ccc;
`

const Step1 = () => {

  const [description, setDescription] = useState(localStorage.getItem("h_description") || '');

  useEffect(() => {
    localStorage.setItem("h_description", description);
  }, [description]);

  const handleChange = (event) => {
    setDescription(event.target.value)
  }


  return (
    <StepContainer>
      <Label>Descripción</Label>
      <TextArea value={description} onChange={handleChange}></TextArea>
    </StepContainer>
  )
}

export default Step1