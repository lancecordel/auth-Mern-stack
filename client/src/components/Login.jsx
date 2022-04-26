import React from 'react'
import styled from 'styled-components';
import favpngregister from '../img/favpngregister.png'

const Container = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;
// border: 1px solid;
background-image: linear-gradient(rgba(255,255,255,0.5),rgba(6, 26, 239,0.5)), url(${favpngregister});
background-size: cover;
`
const RegisterDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: flex-start;
background-color: rgba(255,255,255,0.5);
width: 390px;
// height: 200px;
// padding: 20px;
border: 1px solid blue;
`
const TermsDiv = styled.div`

background-color: rgba(6, 26, 239,.5)
`
const Title = styled.p`
color: white;
`
const TitleDiv = styled.div`
width: 100%;
margin: 0;
text-align: center;
background-color: rgba(6, 26, 239, .3);
`
const Input = styled.input`
padding: 4px;
margin-top: 20px;
width: 70%;
`
const SignInButton = styled.button`
color: white;
padding: 9px;
border: .5px solid black;
margin: 15px 0 15px 0;
background-color: rgba(6, 26, 239, .5);
border-radius: 7px;
`

function Login() {
  return (
    <Container background={favpngregister}>
        <RegisterDiv>
          <TitleDiv>
            <Title>SIGN IN</Title>
          </TitleDiv>
                <Input type='text' placeholder='username'/>
                <Input type='text' placeholder='password'/>
                <SignInButton>SIGN IN</SignInButton>
  
                <TermsDiv>

                </TermsDiv>
        </RegisterDiv>
    </Container>
  )
}

export default Login