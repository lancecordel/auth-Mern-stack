import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
flex: .5;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
background-color: rgba(255,255,255,0.6);
width: 500px;
// height: 350px;
// padding: 20px;
border: 1px solid blue;
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
// border: 3px solid;
align-Items: center;
`
const Add = styled.div`
width: 100%;
`
const Remove = styled.div`
width: 100%;
`
const Update = styled.div`
width: 100%;
`
const OptionSelector = styled.div`
width: 60%;
padding: 20px 0 20px 0;
align-items: center;
`
const Select = styled.select`
padding: 5px;
`
const JustAdded = styled.div`
display:flex;
// font-weight: bold;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px 50px 20px 50px;
// line-height: 2px;
`
const InfoNameTop = styled.div`
flex: 1;
min-width: 50%;
text-align: right;
font-weight: bold;

padding: 0 20px 10px 0;
// border: 1px solid;
`
const InfoDetailTop = styled.div`
flex: 1;
min-width: 50%;
text-align: left;
// border: 1px solid;
`
const InfoNameBottom = styled.div`
flex: 1;
min-width: 50%;
text-align: right;
font-weight: bold;
padding: 0 20px 10px 0;
// border: 1px solid;
`
const InfoDetailBottom = styled.div`
flex: 1;
min-width: 50%;
text-align: left;
// border: 1px solid;
`
const NameDetailTopContainer = styled.div`
display: flex;
width: 100%;
`
const NameDetailBottomContainer = styled.div`
display: flex;
width: 100%;
`
const Description = styled.div`
display: flex;
align-items: top;
width: 100%;
// justify-content: space-between;
// border: 1px solid;
`
const DescripInfo = styled.div`
flex: 1;
text-align: right;
font-weight: bold;
padding: 0 20px 10px 0;
min-width: 50%;
`
const DescripDetail = styled.div`
flex: 1;
text-align: left;
min-width: 50%;
// border: 1px solid;
`
const InfoDetailWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
text-align: center;
align-items: center;
// border: 1px solid;
`
function Admin() {
  // array to store API value of DELETED ITEM;
  const storeItem = [];
  //  Select/option
  const [CRUD, setCRUD] = useState('CHOOSE OPTION');
  const [createdItem, setCreatedItem] = useState(undefined);
  // SET to TRUE after update;
  const [updatedItem, setUpdatedItem] = useState(false);
  //  set to TRUE after 'DELETE' method;
  const [deleted, setDeleted] = useState(false);
  // set to TRUE after 'GET' Method;
  const [validData, setValidData] = useState(false);
  //  'GET', 'DELETE', 'UPDATE' by ID;
  const [id, setId] = useState('');
  // verify product being deleted
  const [itemToDelete, setItemToDelete] = useState({});
  const [input, setInput] = useState({
    category: '',
    size: '',
    color: '',
    title: '',
    description: '',
    image: '',
    price: '',
  });
  
  //  PrevStat take current state and adds to it
  function handleChange(e){
    const {name, value} = e.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  async function handleDeleteChange(e){
    const val = e.target.value;
    setId(val);
   const response = await axios.get(`http://localhost:3000/items/${val}`).catch(console.error)
  const { item } = response.data;
  storeItem.push(item);
  setItemToDelete(storeItem);
  }

  const handleAddClick = async(e) => {
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

  // ADD SINGLE ITEM
        await axios({
        url: `http://localhost:3000/admin/items`,
        method: 'POST',
            data: newProduct,
        }).then(res => setCreatedItem(res.data)).catch(console.error)
  }

  //  REMOVE
  const handleRemoveClick = async(e) => {
    e.preventDefault();
        await axios({
        url: `http://localhost:3000/items/${id}`,
        method: 'DELETE',
        }).then(() => setDeleted(true)).catch(console.error)
  }

// MAKE API CALL DO DATA BASE and set inputs to data retrieved
  async function handleIdChange(e){
    const val = e.target.value;
    setId(val);
   const response = await axios({
      url: `http://localhost:3000/items/${val}`,
      method: 'GET',
  }).then(() => setValidData(true));
    const { item } = response.data;
    // Set input values to data retrieved
    setInput({
     category: item.category,
     size: item.size,
     title: item.title,
     description: item.description,
     image: item.image,
     price: item.price
    })
    // console.log(item)
    // console.log(validData);
  }

  const handleUpdateSubmit = async(e) => {
    e.preventDefault();
    const updateProduct = {
      category: input.category,
      size: input.size,
      color: input.color,
      title: input.title,
      description: input.description,
      image: input.image,
      price: input.price
    }

    // UPDATE SINGLE ITEM
        await axios({
        url: `http://localhost:3000/items/${id}`,
        method: 'PUT',
          data: updateProduct,
        }).then(res => setUpdatedItem(!updatedItem)).catch(console.error)
  }

    // CHOOSE CRUD OPERATION
    function handleAdminSelect(e){
      const optionSelected = e.target.value;
      setCRUD(optionSelected);
  }
  
useEffect(()=>{
  console.log(createdItem)
},[createdItem])
  return (
    <Container background={favadmin}>
        <RegisterDiv>
        <TitleDiv>
            <Title>MANAGE INVENTORY</Title>
          </TitleDiv>
          <OptionSelector>
            <Form>
                <Select onChange={handleAdminSelect} >
                  <option value={null}>CHOOSE OPTION</option>
                  <option value="add">ADD INVENTORY</option>
                  <option value="remove">REMOVE INVENTORY</option>
                  <option value="update">UPDATE INVENTORY</option>
                </Select>           
              </Form>
            </OptionSelector>

            {/* SELECT CRUD OPERATION */}

              { CRUD === 'add' ? 
              <Add>
                  { 
                  typeof createdItem == 'undefined' ? 
                  <Form>
                  <Select name={'category'} placeholder={'choose a category'} value={input.category} onChange={handleChange} >
                    <option value={null}>CHOOSE A CATEGORY</option>
                    <option value="womens">womens</option>
                    <option value="mens">mens</option>
                    <option value="electronics">electronics</option>
                    <option value="jewelry">jewelry</option>
                  </Select>           
                    {/* <Input type='text' name='category' placeholder='category' value={input.category} onChange={handleChange} /> */}
                    <Input type='text' name='size' placeholder='size' value={input.size} onChange={handleChange} />
                    <Input type='text' name='color' placeholder='color' value={input.color} onChange={handleChange} />
                    <Input type='text' name='title' placeholder='title' value={input.title} onChange={handleChange} />
                    <Input type='text' name='description' placeholder='description' value={input.description} onChange={handleChange} />
                    <Input type='text' name='image' placeholder='image' value={input.image} onChange={handleChange} />
                    <Input type='number' name='price' placeholder='price' value={input.price} onChange={handleChange} />
                    <RegisterButton onClick={handleAddClick} >ADD INVENTORY</RegisterButton>
                </Form>
                  : 
                  <JustAdded> 
                  <InfoDetailWrapper>

                  <p>{createdItem.item.title} ADDED TO INVENTORY</p>
                  {/* <span>id:</span> */}
                  <span><b>ID# {createdItem.item._id}</b></span>
                  <NameDetailTopContainer>
                  <InfoNameTop>
                  <p>category:</p>
                  <p>title:</p>
                  </InfoNameTop>
                  <InfoDetailTop>
                  <p>{createdItem.item.category}</p>
                  <p>{createdItem.item.title}</p>
                  </InfoDetailTop>
                  </NameDetailTopContainer>

                  <Description>
                    <DescripInfo>
                    <span>description:</span>
                    </DescripInfo>
                    <DescripDetail>
                    <span>{createdItem.item.description}</span>
                    </DescripDetail>
                  </Description>

                  <NameDetailBottomContainer>
                  <InfoNameBottom>
                  <p>size:</p>
                  <p>price</p>
                  </InfoNameBottom>                    
                  <InfoDetailBottom>
                  <p>{createdItem.item.size}</p>
                  <p>{createdItem.item.price}</p>
                  </InfoDetailBottom>

                  </NameDetailBottomContainer>

                  </InfoDetailWrapper>
          
                  {/* <button>GO TO LISTING</button> */}
                </JustAdded>
                  }
                </Add>

                :  '' }
              { CRUD === 'remove' ? 
              <Remove>
              <Form>     
                    {/* <Input type='text' name='category' placeholder='category' value={input.category} onChange={handleChange} /> */}
                    <p><b>DELETE BY ID</b></p>
                    <Input type='text' name='id' placeholder='ENTER ID NUMBER' onChange={handleDeleteChange} />
                    { 
                    deleted? 
                    <div>
                      <p>{itemToDelete[0].title}</p>
                      <p>Has been deleted!</p>
                    </div> 
                    : 
                    '' }
                    <RegisterButton onClick={handleRemoveClick} >REMOVE INVENTORY</RegisterButton>

                </Form>
                </Remove>
              
              :  '' }

              { CRUD === 'update' ? 
              <Update>
                { updatedItem? 
               <Form>        
                  <InfoDetailWrapper>

                  <p>{input.title} UPDATED IN INVENTORY</p>
                  {/* <span>id:</span> */}
                  <span><b>ID# {id}</b></span>
                  <NameDetailTopContainer>
                  <InfoNameTop>
                  <p>category:</p>
                  <p>title:</p>
                  </InfoNameTop>
                  <InfoDetailTop>
                  <p>{input.category}</p>
                  <p>{input.title}</p>
                  </InfoDetailTop>
                  </NameDetailTopContainer>

                  <Description>
                    <DescripInfo>
                    <span>description:</span>
                    </DescripInfo>
                    <DescripDetail>
                    <span>{input.description}</span>
                    </DescripDetail>
                  </Description>

                  <NameDetailBottomContainer>
                  <InfoNameBottom>
                  <p>size:</p>
                  <p>price</p>
                  </InfoNameBottom>                    
                  <InfoDetailBottom>
                  <p>{input.size}</p>
                  <p>{input.price}</p>
                  </InfoDetailBottom>
                  </NameDetailBottomContainer>

                  </InfoDetailWrapper>
                  <p>UPDATE COMPLETE!</p>
                  <RegisterButton onClick={handleUpdateSubmit} >EDIT</RegisterButton>
              </Form> 
                : 
                <Form>        
                    <Input type='text' name='id' placeholder='ENTER ID# TO UPDATE' value={id} onChange={handleIdChange} />
                    <Input type='text' name='category' placeholder='category' value={input.category} onChange={handleIdChange} />
                    <Input type='text' name='size' placeholder='size' value={input.size} onChange={handleChange} />
                    <Input type='text' name='color' placeholder='color' value={input.color} onChange={handleChange} />
                    <Input type='text' name='title' placeholder='title' value={input.title} onChange={handleChange} />
                    <Input type='text' name='description' placeholder='description' value={input.description} onChange={handleChange} />
                    <Input type='text' name='image' placeholder='image Link' value={input.image} onChange={handleChange} />
                    <Input type='number' name='price' placeholder='price' value={input.price} onChange={handleChange} />
                    <RegisterButton onClick={handleUpdateSubmit} >UPDATE INVENTORY</RegisterButton>
                </Form> 
            }

                </Update>
                :  ''
              }

        </RegisterDiv>
    </Container>
  )
}

export default Admin


