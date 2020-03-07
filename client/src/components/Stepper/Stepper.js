import React, { useState } from 'react'
import Stepper from 'react-stepper-horizontal'

import styled from 'styled-components'

// Steps
import Step1 from './Step1'


const StepContainer = styled.div`
  padding: 25px 25px;
  height: 40vh;
`

const StepButtons = styled.div`
  display: flex;
  /* align-self: flex-end; */
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

    // const [date, setDate ] = useState(localStorage.getItem("h_date") || '');

    // useEffect(() => {
    //   localStorage.setItem("h_date", date);
    // }, [date]);


  const [ currentStep, setCurrentStep] = useState(0)

  const onClickNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const onClickBack = () => {
    setCurrentStep(currentStep > 0 ? currentStep - 1 : 0)
  }

  return (
    <>
      <Stepper steps={ steps } activeStep={ currentStep } />
      <StepContainer>
        { currentStep === 0 && <Step1></Step1>}
      </StepContainer>
      <StepButtons>
        <button  onClick={ onClickBack }>Atrás</button>
        <button  onClick={ onClickNext }>Continuar</button>
      </StepButtons>
    </>
  )
}

export default StepperForm