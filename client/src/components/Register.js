import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import favpngregister from '../img/favpngregister.png'
import favregister from '../img/favregister.png';

const Container = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;
// border: 1px solid;
background-image: linear-gradient(rgba(255,255,255,0.9),rgba(255, 255, 255,0.7)), url(${favregister});
// background-image: linear-gradient(rgba(255,255,255,0.8),rgba(255, 240, 255,0.8));
background-size: cover;
`
const RegisterDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
background-color: rgba(255,255,255,0.9);
width: 590px;
// height: 350px;
// padding: 20px;
border: 1px solid blue;
`
const Terms = styled.div`
padding: 15px 7px 15px 14px;
font-size: 11px;
color: white;
`
const TermsDiv = styled.div`
background-color: rgba(6, 26, 239,.7)
`
const Title = styled.p`
color: white;
`
const TitleDiv = styled.div`
width: 100%;
margin: 0;
text-align: center;
background-color: rgba(6, 26, 239, .7);
`
const Input = styled.input`
font-size: 17px;
padding: 9px;
margin: 5px;
width: 70%;
`
const RegisterButton = styled.button`
color: white;
padding: 9px;
border: .5px solid black;
margin: 15px 0 15px 0;
background-color: rgba(6, 26, 239, .5);
border-radius: 7px;
`
const Form = styled.form`
display: flex;
flex-direction: column;
padding: 10px 0 0 0;
width: 100%;
align-Items: center;
`
function Register() {
  const navigate = useNavigate();
  const [createUserInfo, setCreateUserInfo] = useState('');
  const [confirmUserCreation, setConfirmUserCreation] = useState(false);
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  }); 
  

  function handleChange(e){
    const {name, value} = e.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  const handleSubmitClick = async(e) => {
    e.preventDefault();
    const newUser = {
      username: input.username,
      email: input.email,
      password: input.password
    }

   await axios.post('http://localhost:3000/users/register', newUser).then(()=> setConfirmUserCreation(true));
   setCreateUserInfo(newUser);
  }
  useEffect(() => {
    if(createUserInfo){ 
      console.log('after axios',createUserInfo)
     }

  },[createUserInfo, navigate])


  return (
    <Container background={favpngregister}>

        { 

        confirmUserCreation ?   
        
        <RegisterDiv>
          <TitleDiv>
              <Title>USER CREATED</Title>
          </TitleDiv>
        </RegisterDiv>
        
        :  
        (
        <RegisterDiv>          
          <TitleDiv>
            <Title>CREATE AN ACCOUNT</Title>
          </TitleDiv>
          <Form>
                <Input type='text' name='username' placeholder='username' value={input.username} onChange={handleChange} />
                <Input type='text' name='email' placeholder='email' value={input.email} onChange={handleChange} />
                <Input type='password' name='password' placeholder='password' value={input.password} onChange={handleChange} />
                <RegisterButton onClick={handleSubmitClick} >REGISTER</RegisterButton>
            </Form>

                <TermsDiv>
                <Terms>
                      I Agree to the terms and conditions of this site persuant
                      to the PRIVACY POLICY 
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <input type='checkbox' />
                  </Terms>
                </TermsDiv>

        </RegisterDiv>
              )

            }

    </Container>
  )
}

export default Register