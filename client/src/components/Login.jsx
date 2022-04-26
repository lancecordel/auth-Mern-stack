import React, { useState } from 'react'
import styled from 'styled-components';
import favpngregister from '../img/favpngregister.png'
import axios from 'axios';

const Container = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;
// border: 1px solid;
// background-image: linear-gradient(rgba(255,255,255,0.5),rgba(239, 6, 6,0.5)), url(${favpngregister});
background-image: linear-gradient(rgba(255,255,255,0.5),rgba(255, 255, 255,0.5)), url(${favpngregister});
background-size: cover;
`
const RegisterDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: flex-start;
background-color: rgba(255,255,255,0.7);
width: 590px;
// height: 200px;
// padding: 20px;
// border: 1px solid blue;
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
background-color: rgba(6, 26, 239, .7);
`
const Input = styled.input`
font-size: 17px;
padding: 6px;
margin-top: 20px;
width: 70%;
`
const SignInButton = styled.button`
color: white;
padding: 9px;
border: .5px solid black;
margin: 15px 0 15px 0;
background-color: rgba(6, 26, 239, .7);
border-radius: 7px;
`
const Form = styled.form`
display: flex;
flex-direction: column;
padding: 10px 0 0 0;
width: 100%;
align-Items: center;
`

function Login() {
  const [username, setUserName] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  // function handleChange(e){
  //   const {name, value} = e.target;
  //   setInput(prevInput => {
  //     return {
  //       ...prevInput,
  //       [name]: value
  //     }
  //   })
  // }


  const submitHandler = async(e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post("/authorize/login", {
      username,
      email,
      password
      
    })






  }

  return (
    <Container background={favpngregister}>
        <RegisterDiv>
          <TitleDiv>
            <Title>SIGN IN</Title>
          </TitleDiv>
          <Form>
                <Input type='text' name='username' placeholder='username' value={input.username} onChange={(e)=>setUserName(e.target.value)} />
                <Input type='text' name='email'  placeholder='email' value={input.email} onChange={(e)=>setEmail(e.target.value)} />
                <Input type='text' name='password' placeholder='password' value={input.password} onChange={(e)=>setPassword(e.target.value)} />
                <SignInButton onClick={submitHandler} >SIGN IN</SignInButton>
                {/* {console.log(userName, password)} */}
          </Form>

  
                <TermsDiv>

                </TermsDiv>
        </RegisterDiv>
    </Container>
  )
}

export default Login

// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "users",
//     "database": "shop",
//     "dataSource": "Cluster0",
//     "projection": {
//         "_id": 1
//     }
// });
            
// var config = {
//     method: 'post',
//     url: 'https://data.mongodb-api.com/app/data-sjhoa/endpoint/data/beta/action/findOne',
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Request-Headers': '*',
//         'api-key': '0gzyMue6VeONxxdWRTwVDLQtw5EFicz26YLtnHtzo3dwEJ6CsFDULdVibuNeVEVc'
//     },
//     data : data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });


//     // console.log(input)
//     //POST request with body equal on data in JSON format
//     const data = {}

//   await fetch('/authorize/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(),
// })
// .then((response) => response.json())
// //Then with the data from the response in JSON...
// .then((data) => {
//   console.log('Success:', console);
// })
// //Then with the error genereted...
// .catch((error) => {
//   console.error('Error:', error);
// });
