import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex; 
  align-items: center;
  justify-content: space-between; 
  background-color: beige; 
  padding: 10px 20px 10px 20px;
  height: 50px;`
const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;`
const Center = styled.div`
flex: 1;`
const Left = styled.div`
flex: 1;`
const Right = styled.div`
flex: 1;`
const Input = styled.input`
  border: 0px solid;
  background-color: beige;`
const SearchContainer = styled.div`
  display: flex;  
  padding: 5px; 
  margin-right: 77px;
  border: .5px solid grey;
  justify-content: end;`
const Logo = styled.div`
font-weight: bold;
 font-size: 30px;`
const MenuItem = styled.div``;
const MenuItemContainer= styled.div`
  display: flex;  
  padding: 3px; 
  // border: 1px solid;
  justify-content: space-between;`

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'black'
  };


function Navbar() {
  return (
    <Wrapper>
        <Container>
          <Left>
            <NavLink to={'/'} style={linkStyle} >
              <Logo>SHOPPA</Logo>
            </NavLink>
          </Left>
          <Center>
          <SearchContainer>
              <Input  /> &nbsp; &nbsp; &nbsp;
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchContainer>
          </Center>
          <Right>
            <MenuItemContainer>
              <MenuItem>SIGN IN</MenuItem>
              <MenuItem>REGISTER</MenuItem>
              <FontAwesomeIcon icon={faShoppingCart} />
            </MenuItemContainer>
          </Right>
        </Container>
    </Wrapper>

  )
}

export default Navbar