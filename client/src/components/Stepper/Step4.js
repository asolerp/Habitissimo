import React, { useContext } from 'react'

// Global Store
import { store } from '../../store/store';
import styled from 'styled-components';
import { device } from '../../utils/devices'


// Styles
import { StepContainer } from '../../styles/formStyles'

const ResumenInputConatiner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Title = styled.h1`
  font-size: 20px;
  color: black;
  text-align: center;
  font-weight: 200;
  margin-top: 15px;
`
const Span = styled.p`
  color: black;
  margin-bottom: 0;
  font-weight: 100;
  font-size: 15px;

  @media ${device.laptop} { 
    font-size: 20px;
  }

`
const Value = styled.p`
  color: #2684ff;
  margin-bottom: 0;
  margin-left: 10px;
  font-weight: 300;
  font-size: 15px;

  @media ${device.laptop} { 
    font-size: 20px;
  }
`
const Description = styled.p`
  color: #2684ff;
  margin-bottom: 0;
  font-weight: 300;
  font-size: 15px;
  
  @media ${device.laptop} { 
    font-size: 20px;
  }
`

const Step4 = () => {

  const globalState = useContext(store);
  const { state } = globalState;

  return (
    <StepContainer>
      {/* <Title>RESUMEN</Title> */}
      <Span>Descripción: </Span>
      <Description>{state.description}</Description>
      <ResumenInputConatiner>
        <Span>Fecha próxima: </Span>
        <Value>{state.date.label}</Value>
      </ResumenInputConatiner>
      <ResumenInputConatiner>
        <Span>Categoría: </Span>
        <Value>{state.category.label || ""}</Value>
      </ResumenInputConatiner>
      <ResumenInputConatiner>
        <Span>Subcategoría: </Span>
        <Value>{state.subcategory.label || ""}</Value>
      </ResumenInputConatiner>
      <ResumenInputConatiner>
        <Span>Precio: </Span>
        <Value>{state.price.label || ""}</Value>
      </ResumenInputConatiner>
      <ResumenInputConatiner>
        <Span>Nombre: </Span>
        <Value>{state.name}</Value>
      </ResumenInputConatiner>
      <ResumenInputConatiner>
        <Span>Email: </Span>
        <Value>{state.email}</Value>
      </ResumenInputConatiner>
      <ResumenInputConatiner>
        <Span>Teléfono: </Span>
        <Value>{state.phone}</Value>
      </ResumenInputConatiner>
    </StepContainer>
  )
}

export default Step4