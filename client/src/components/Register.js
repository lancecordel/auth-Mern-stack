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
background-image: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,0,0.5)), url(${favpngregister});
background-size: cover;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
background-color: rgba(255,255,255,0.5);
width: 290px;
height: 300px;
padding: 20px;
border: 1px solid silver;
`
const Terms = styled.div`

`

function Register() {
  return (
    <Container background={favpngregister}>
        <Wrapper>
            <p>CREATE AN ACCOUNT</p>
            {/* <form> */}
                <input type='text' placeholder='first name'/>
                <input type='text' placeholder='last name'/>
                <input type='text' placeholder='email'/>
                <input type='text' placeholder='username'/>
                <input type='text' placeholder='password'/>
                <Terms>
                    I Agree to the terms and conditions of this site persuant
                    to the <a href>Privacy Policy</a>
                </Terms>
            {/* </form> */}
        </Wrapper>
    </Container>
  )
}

export default Register