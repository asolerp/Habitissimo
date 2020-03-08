import React, { useContext } from 'react'

// Global Store
import { store } from '../../store/store';
import styled from 'styled-components';

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 20px;
  color: black;
`
const Span = styled.span`
  color: black;
`
const Value = styled.p`
  color: black;
`

const Step4 = () => {

  const globalState = useContext(store);
  const { state } = globalState;

  return (
    <StepContainer>
      <Title>Resumen</Title>
      <Span>Descripción: </Span>
      <Value>{state.description}</Value>
      <Span>Fecha próxima: </Span>
      <Value>{state.date.label}</Value>
      <Span>Categoría: </Span>
      <Value>{state.category.label}</Value>
      <Span>Subcategoría: </Span>
      <Value>{state.subcategory.label}</Value>
      <Span>Nombre: </Span>
      <Value>{state.name}</Value>
      <Span>Email: </Span>
      <Value>{state.email}</Value>
      <Span>Teléfono: </Span>
      <Value>{state.phone}</Value>
    </StepContainer>
  )
}

export default Step4