import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: beige; 
  `
const Wrapper = styled.div`padding: 5px 20px;`
const Center = styled.div`flex: 1;`
const Left = styled.div`flex: 1;`
const Right = styled.div`flex: 1;`
const SearchContainer = styled.div``;

const Language = styled.span``

function Navbar() {
  return (
    <Wrapper>
        <Container>
          <Left>
            <Language>ENG</Language>
          </Left>
          <Left>Center</Left>
          <Left>
            <SearchContainer>
              input
              icon
            </SearchContainer>
          </Left>
        </Container>
    </Wrapper>

  )
}

export default Navbar