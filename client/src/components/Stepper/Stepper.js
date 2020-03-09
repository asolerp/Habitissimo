import React, { useState, useContext } from 'react'
import Stepper from 'react-stepper-horizontal'

import styled from 'styled-components'

// Utils
import { device } from '../../utils/devices'
import { isEmpty } from '../../utils/validations'
import axios from 'axios'

// Global Store
import { store } from '../../store/store';

// Styles
import { StepContainer } from '../../styles/formStyles'

// Steps
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Spinner from '../Common/Spinner'

// Components
import Modal from '../Common/Modal'

const StepperPage = styled.div`
  height: 90vh;
  padding: 0px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;

`

const TopSection = styled.div`
  height: 10%;

  @media ${device.tablet} { 
    width: 60%;
    margin: 0 auto;
  }
`
const MiddleSection = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media ${device.tablet} { 
    width: 60%;
  }

  @media ${device.laptop} { 
    width: 40%;
  }

`
const BottomSection = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StepButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 15px;
  background-color: #2684FF;
  width: 100%;
  border: 0;
  border-radius: 5px;
  color: white;
  font-size: 20px;
`

const BackButton = styled.p`
  color: black;
  font-weight: 300;
`

const Error = styled.p`
  text-align: center;
  color: red;
  font-size: 15px;
`

const ModalText = styled.p`
  color: white;
  text-align: center;
  font-size: 15px;
`

const StepperForm = () => {

    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const handleStepPress = (e, step) => {
      e.preventDefault()
      dispatch({
        type: "step",
        value: step
       })
    }

    const steps = [{
      onClick: (e) => handleStepPress(e, 0)
    }, {
      onClick: (e) => handleStepPress(e, 1)
    }, {
      onClick: (e) => handleStepPress(e, 2)
    }, {
      onClick: (e) => handleStepPress(e, 3)
    }]

    const validation_step1 = () => {
      if ( !isEmpty(state.description) ) {
        setError("")
        return true
      }
      setError("El campo descripción no puede estar vacío")
      return false
    }

    const validation_step2 = () => {
      if ( !isEmpty(state.category) && !isEmpty(state.subcategory) ) {
        setError("")
        return true
      }
      setError("El campo categoría y subcategoría no pueden estar vacíos")
      return false
    }

    const validation_step3 = () => {
      if ( !isEmpty(state.name) && !isEmpty(state.email) && !isEmpty(state.phone) ) {
        setError("")
        return true
      }
      setError("El campo nombre, email y teléfono deben estar completados")
      return false
    }

  const onClickNext = () => {
    if (state.step === 0) {
      validation_step1() && dispatch({
       type: "step",
       value: state.step + 1
      })
    }
    if (state.step === 1) {
      validation_step2() && dispatch({
        type: "step",
        value: state.step + 1
       })
    }
    if (state.step === 2) {
      validation_step3() && dispatch({
        type: "step",
        value: state.step + 1
       })
    }    
  }

  const onClickBack = () => {
    setError("")
    dispatch({
      type: "step",
      value: state.step > 0 ? state.step - 1 : 0
     })
  }

  const clearStores = () => {
    dispatch({
      type: "clear"
    })
  }

  const sendBudget = async () => {
    setLoading(true)
    setError("")
    try {
      // To mantain consistence with backend challenge
      const body = {
        title: "",
        description: state.description, 
        category: state.category.value,
        subcategory: state.subcategory.value, 
        email: state.email,
        phone: state.phone,
        address: "Palma de Mallorca"
      }
      await axios.post('http://localhost:3030/api/budget', body)
      setLoading(false)
      clearStores()
      setModalOpen(true)
      setTimeout(() => {
        setModalOpen(false)
      }, 2000)
    } catch (err) {
      setError("Algo fue mal al enviar el presupuesto ...")
      setLoading(false)
    }
  }

  return (
    <>
      <Modal open={modalOpen}>
        <ModalText>El presupuesto se ha enviado correctamente!</ModalText>
      </Modal>
      <StepperPage>
        <TopSection>
          <Stepper steps={ steps } activeStep={ state.step } completeBarColor="#2684FF"/>
        </TopSection>
        <MiddleSection>
          <StepContainer>
            { state.step === 0 && <Step1></Step1>}
            { state.step === 1 && <Step2></Step2>}
            { state.step === 2 && <Step3></Step3>}
            { state.step === 3 && <Step4></Step4>}
            {
              error && <Error>{error}</Error>
            }
          </StepContainer>
        </MiddleSection>
        <BottomSection>
          <StepButtons>   
            {
              state.step < 3 ? <Button  onClick={ onClickNext }>Continuar</Button> :  
              <Button  onClick={ sendBudget }>
                {
                  loading ? <Spinner loading></Spinner> : "Enviar presupuesto"  
                }          
              </Button>
            }   
            {
              state.step  > 0 && <BackButton  onClick={ onClickBack }>Atrás</BackButton>
            }    
          </StepButtons>
        </BottomSection>
      </StepperPage>
    </>
  )
}

export default StepperForm