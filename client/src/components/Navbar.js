import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex; 
  align-items: center;
  justify-content: space-between; 
  // background-color: beige; 
  padding: 10px 20px 10px 20px;
  // border-bottom: 3px solid gold;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .2);
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
  background-color: white;
  `
const SearchContainer = styled.div`
  display: flex;  
  padding: 5px; 
  margin-right: 77px;
  border: .5px solid silver;
  background-color: white;
  border-radius: 20px;
  justify-content: end;
  // box-shadow: 0 2px;
  `
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
  const navigate = useNavigate();

  function handleClick(event){
    const val = event.target.getAttribute('value').toLowerCase();
    // console.log('clicked',val)
    navigate(`/authorize/${val}`)
  }

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
              <MenuItem onClick={(e)=>handleClick(e)} value={'login'} >SIGN IN</MenuItem>
              <MenuItem onClick={(e)=>handleClick(e)} value={'register'} >REGISTER</MenuItem>
              <FontAwesomeIcon icon={faShoppingCart} />
            </MenuItemContainer>
          </Right>
        </Container>
    </Wrapper>

  )
}

export default Navbar