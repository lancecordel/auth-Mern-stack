import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`display: flex; justify-content: space-between; background-color: beige; padding: 10px;`
const Wrapper = styled.div`padding: 5px 20px;`
const Center = styled.div`flex: 1;`
const Left = styled.div`flex: 1;`
const Right = styled.div`flex: 1;`
const Input = styled.input`
  // border: .5px solid;
  light-blue;
  // width: 70%;`
const SearchContainer = styled.div`
  display: flex;  
  padding: 3px; 
  // border: 1px solid;
  justify-content: start;`

const Logo = styled.div`font-weight: bold; font-size: 30px;`
const MenuItem = styled.div``;
const MenuItemContainer= styled.div`
display: flex;  
padding: 3px; 
// border: 1px solid;
justify-content: space-between;`

const Language = styled.span``

function Navbar() {
  return (
    <Wrapper>
        <Container>
          <Left>
            <SearchContainer>
              <Input  />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchContainer>

          </Left>
          <Center>
            <Logo>shoppers.</Logo>
          </Center>
          <Right>
            <MenuItemContainer>
              <MenuItem>REGISTER</MenuItem>
              <MenuItem>SIGN IN</MenuItem>
              <FontAwesomeIcon icon={faShoppingCart} />
            </MenuItemContainer>
          </Right>
        </Container>
    </Wrapper>

  )
}

export default Navbar