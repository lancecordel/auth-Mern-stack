// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import React from 'react'
import axios from "axios";

const Container = styled.div`
// flex: 1;
display: flex;
// flex-wrap: wrap;
align-items: center;
justify-content: center;
// border: 6px solid;
width: 95vw;
height: 90vh;
margin: 20px;`

const ImageDiv = styled.div`
flex: 1;
display: flex;
align-items: center;
flex-direction: column;
justify-content: start;
padding: 60px 0 0 0;;
// border: 1px solid;
width: 30%;
// height: 80%;
`
const ItemDescription = styled.div`
flex: 1;
display: flex;
text-align: center;
flex-direction: column;
// jusify-content: space-between;
padding: 35px;
// border: 1px solid;

`
const Wrapper = styled.div`
display: flex;
height: 75%;
// border: 1px solid;
`
const PriceDiv = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: green;
font-size: 50px;
font-weight: bold;
// padding: 0px 35px 0px 35px;
// width: 100%;
// border: 1px solid;
`
const ToCart = styled.button`
height: 70px;
font-weight: bold;
font-size: 20px;
padding-left: 10px;
padding-right: 10px;
border: 1px solid;
background-color: white;
border-radius: 15px;
`
const Img = styled.img`
width: 80%;

`
const SelectDiv = styled.div`

`
const Select = styled.select`
font-size: 20px;
text-align: center;
width: 115px;
height: 70px;
border: 2px solid;
// border-radius: 10px;

`


function Item() {
  const[item, setItem] = useState([]);

  const { product } = useParams();
  console.log(product)
  
  async function fetchData(){
    try{
      const products = await axios.get("https://fakestoreapi.com/products")
      const { data } = products;
      const selectItem = data.filter(item => item.id === parseInt(product))
      setItem(selectItem);
    } catch(err) {
      console.error('error', err.message)
    }
  }
  useEffect(()=> {
      fetchData();
      console.log("loading")
  },[])

  return (
    <div>
      {typeof item !== "undefined" ? 
            item.map(item => {
              return(
                <Container>
                  <Wrapper>
                  <ImageDiv>
                    <Img src={item.image} alt={'item'}/>
                  </ImageDiv>
                  <ItemDescription>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <PriceDiv>
                     <p>${item.price}</p>
                     <SelectDiv>
                      <Select>
                        <option value="1">quanity</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </Select>
                    </SelectDiv>
                     <ToCart>ADD TO CART</ToCart>
                    </PriceDiv>
                  </ItemDescription>
                  </Wrapper>                
                </Container>
              )
            })
      : ''}
    </div>
  )
}

export default Item

