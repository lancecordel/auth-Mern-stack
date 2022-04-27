import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ItemCard from './ItemCard'
import SearchResults from './SearchResults'


const Container = styled.div`
  display: flex; 
  align-items: center;
  justify-content: space-between; 
  // background-color: beige; 
  padding: 10px 20px 10px 20px;
  // border-bottom: 3px solid gold;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .2);
  // height: 50px;
  `

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
  width: 90%;
  // padding: 0 0 10px;
  height: 15px;
  background-color: white;
  `
const SearchContainer = styled.div`

  display: flex;  
  padding: 0px 10px 0; 
  align-items: center;
  justify-content: center;
  margin-right: 77px;
  border: .5px solid silver;
  background-color: white;
  border-radius: 20px;
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

  const Results = styled.div`
  display: flex;

  width: 100%;
  // height: 100%;
  // padding: 200px 30px 0 30px;
  background-color: rgba(255, 255, 255, 0);
  z-index: 3;
  `
  const ResultItem = styled.div`
  padding: 10px;
  `

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'black'
  };


function Navbar(props) {
  const[searchItem, setSearchItem] = useState();
  const navigate = useNavigate();

  async function handleSearch(e){
    const query = e.target.value;
    const product = await axios.get("https://fakestoreapi.com/products")
    const { data } = product;
    const queryItem = data.filter(item => item.description.includes(query));
    setSearchItem(e.target.value !== '' ? queryItem : []);
    // console.log (e.target.getAttribute('value'));
  }

  function handleSignInClick(event){
    const val = event.target.getAttribute('value').toLowerCase();
    // console.log('clicked',val)
    navigate(`/authorize/${val}`)
  }
  function handleAdminClick(event){
    const val = event.target.getAttribute('value').toLowerCase();
    // console.log('clicked',val)
    navigate(`/admin/${val}`)
  }
  function handleRegisterClick(event){
    const val = event.target.getAttribute('value').toLowerCase();
    // console.log('clicked',val)
    navigate(`/users/${val}`)
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
          <SearchContainer >
              <Input onChange={(e)=>handleSearch(e)} /> &nbsp; &nbsp; &nbsp;
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchContainer>
          </Center>
          <Right>
            <MenuItemContainer >
              <MenuItem onClick={(e)=>handleSignInClick(e)} value={'login'} >SIGN IN</MenuItem>
              <MenuItem onClick={(e)=>handleRegisterClick(e)} value={'register'} >REGISTER</MenuItem>
              <MenuItem onClick={(e)=>handleAdminClick(e)} value={'items'} >ADMIN</MenuItem>
              <FontAwesomeIcon icon={faShoppingCart} />
            </MenuItemContainer>
          </Right>
        </Container>
        <Results>
        { typeof searchItem !== 'undefined'?  
            <ResultItem>
              {searchItem.map(item => {
                return(
                  <img src={item.image} height={'200'}/>
                )
              })}
            </ResultItem>  
         : ''  } 
        </Results>

    </Wrapper>
    

  )
}

export default Navbar