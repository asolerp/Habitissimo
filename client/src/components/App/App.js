import React from 'react';
import './App.css';

// Utils
import styled from 'styled-components'

// Components
import Header from '../Header/Header';
import StepperForm from '../Stepper/Stepper'

const AppContainer = styled.div`

`

const AppBody = styled.header`
  background-color: #f2f2f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
`

const App = () => {
  return (
    <AppContainer>
      <Header></Header>
      <AppBody>
        <StepperForm/>
      </AppBody>
    </AppContainer>
  );
}

export default App;
