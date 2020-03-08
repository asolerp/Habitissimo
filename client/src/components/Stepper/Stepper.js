import React, { useState, useContext } from 'react'
import Stepper from 'react-stepper-horizontal'

import styled from 'styled-components'

// Global Store
import { store } from '../../store/store';

// Steps
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'


const StepContainer = styled.div`
  padding: 25px 25px;
  height: 40vh;
`

const StepButtons = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  /* align-self: flex-end; */
`

const Button = styled.button`
  padding: 15px 15px;
  background-color: blue;
  color: white;
  font-size: 20px;
`

const Error = styled.p`
  text-align: center;
  color: red;
  font-size: 15px;
`

const steps = [{
  onClick: (e) => {
    e.preventDefault()
    console.log('onClick', 1)
  }
}, {
  onClick: (e) => {
    e.preventDefault()
    console.log('onClick', 2)
  }
}, {
  onClick: (e) => {
    e.preventDefault()
    console.log('onClick', 3)
  }
}, {
  onClick: (e) => {
    e.preventDefault()
    console.log('onClick', 4)
  }
}]

const StepperForm = () => {

    const globalState = useContext(store);
    const { state } = globalState;

    const [error, setError] = useState("")

    const isEmpty = (input) => {
      if (input === undefined || input === '') {
        return true;
      }
      if (input.replace(/\s/g, '').length) {
        return false;
      } return true;
    };

    const validation_step1 = () => {
      console.log(currentStep, state.description.length)
      if ( state.description || state.description.length > 0 ) {
        setError("")
        return true
      }
      setError("El campo descripción no puede estar vacío")
      return false
    }

    const validation_step2 = () => {
      if ( state.category !== null && state.subcategory !== null ) {
        setError("")
        return true
      }
      setError("El campo categoría y subcategoría no pueden estar vacíos")
      return false
    }

    const validation_step3 = () => {
      if ( state.name !== null && state.subcategory !== null ) {
        setError("")
        return true
      }
      setError("El campo categoría y subcategoría no pueden estar vacíos")
      return false
    }

    // const [date, setDate ] = useState(localStorage.getItem("h_date") || '');

    // useEffect(() => {
    //   localStorage.setItem("h_date", date);
    // }, [date]);


  const [ currentStep, setCurrentStep] = useState(0)

  const onClickNext = () => {
    console.log("Validation", validation_step1())
    switch(currentStep) {
      case 0:
        validation_step1() && setCurrentStep(currentStep + 1)
      case 1:
        validation_step2() && setCurrentStep(currentStep + 1)
      case 2:
        validation_step3() && setCurrentStep(currentStep + 1)
      default: 
        return false
    }
    
  }

  const onClickBack = () => {
    setCurrentStep(currentStep > 0 ? currentStep - 1 : 0)
  }

  return (
    <>
      <Stepper steps={ steps } activeStep={ currentStep } />
      <StepContainer>
        { currentStep === 0 && <Step1></Step1>}
        { currentStep === 1 && <Step2></Step2>}
        { currentStep === 2 && <Step3></Step3>}
        { currentStep === 3 && <Step4></Step4>}
        {
          error && <Error>{error}</Error>
        }
      </StepContainer>
      <StepButtons>
        {
          currentStep  > 0 && <button  onClick={ onClickBack }>Atrás</button>
        }
        {
          currentStep < 3 ? <Button  onClick={ onClickNext }>Continuar</Button> :  <Button  onClick={ onClickNext }>Enviar presupuesto</Button>
        }       
      </StepButtons>
    </>
  )
}

export default StepperForm