import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
    width: 200px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -50px;
    background-color: rgba(38, 132, 255, 0.9);
    border: 0;
    border-radius: 10px;
    z-index: 2
`

const Modal = ({ open, children }) => {
    return (
        <>
        {
            open && (
            <ModalContainer>
                {children}
            </ModalContainer>
            )
        }
        </>
        
    )
}

export default Modal