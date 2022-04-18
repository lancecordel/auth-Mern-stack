import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: beige; `

const Wrapper = styled.div`
  padding: 5px 20px;`

function Navbar() {
  return (
    <Wrapper>
        <Container>
          Navbar
        </Container>
    </Wrapper>

  )
}

export default Navbar