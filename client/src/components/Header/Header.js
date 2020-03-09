import React from 'react'
import styled from 'styled-components'
import { device } from '../../utils/devices'

import logo from '../../assets/images/Logo_Habitissimo.png'

const NavBar = styled.nav`
  background-color: white;
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 10vw;
  height: 2.5vh;

  @media ${device.mobileS} { 
    width: 55vw;
  }

  @media ${device.tablet} { 
    width: 25vw;
  }

  @media ${device.laptop} { 
    width: 15vw;
  }

  @media ${device.desktop} { 
    width: 10vw;
  }

  @media ${device.desktopL} { 
    width: 10vw;
  }

`

const Header = () => {
  return (
    <NavBar>
      <Image src={logo} alt="Habitissimo"></Image>
    </NavBar>
  )
}

export default Header