import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import favadmin from '../img/favadmin.png'

const Container = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;
// border: 1px solid;
background-image: linear-gradient(rgba(255,255,255,0.5),rgba(255, 255, 255,0.5)), url(${favadmin});
background-size: cover;
`
const RegisterDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
background-color: rgba(255,255,255,0.6);
width: 250px;
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

function Admin() {

  const [username, setUserName] = useState('');
  const [size, setsize] = useState('');
  const [color, setcolor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [item, setItem] = useState('');
  const [input, setInput] = useState({
    category: '',
    size: '',
    color: '',
    title: '',
    description: '',
    image: '',
    price: '',
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

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const newProduct = {
      category: input.category,
      size: input.size,
      color: input.color,
      title: input.title,
      description: input.description,
      image: input.image,
      price: input.price
    }
    // console.log(input)
    axios('/admin/items').then(res => setItem(res.data.item)).catch(console.error);
    // const response = await axios.get('/');
    // console.log(response)
  }


  return (
    <Container background={favadmin}>
        <RegisterDiv>
          <TitleDiv>
            <Title>MANAGE INVENTORY</Title>
          </TitleDiv>
          <Form>
                <Input type='text' name='category' placeholder='category' value={input.category} onChange={handleChange} />
                <Input type='text' name='size' placeholder='size' value={input.size} onChange={handleChange} />
                <Input type='text' name='color' placeholder='color' value={input.color} onChange={handleChange} />
                <Input type='text' name='title' placeholder='title' value={input.title} onChange={handleChange} />
                <Input type='text' name='description' placeholder='description' value={input.description} onChange={handleChange} />
                <Input type='text' name='price' placeholder='price' value={input.price} onChange={handleChange} />
                <RegisterButton onClick={handleSubmitClick} >ADD INVENTORY</RegisterButton>
            </Form>
        </RegisterDiv>
    </Container>
  )
}

export default Admin