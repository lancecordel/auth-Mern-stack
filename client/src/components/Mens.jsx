import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Categories from './Categories'
import styled from 'styled-components';

const Container = styled.div`
// flex: 1;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
// border: 6px solid;
width: 95vw;
height: 90vh;
margin: 20px;`

const Img = styled.img`
// flex: 1;
height: 70%;
// border: 1px solid;`

const ImageDiv = styled.div`
flex: 1;
display: flex;
justify-content: center;
padding: 10px;
// border: 1px solid;
// width: 30%;
height: 80%;`

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
width: 90%;
border: 3px solid;`

function Mens() {
    const navigate = useNavigate();    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState([])
    const [mens, setMens] = useState([])

    async function fetchData(){
      try{
        const product = await axios.get("https://fakestoreapi.com/products")
        const { data } = product;
        // console.log(data)

        const men = data.filter(product => product.category === "men's clothing")
        console.log(men)
    
        setMens(men)
        setInfo(data);
      } catch(err) {
        console.error('error', err.message)
      }
    }
    useEffect(()=> {
        fetchData();
    },[])
    console.log(mens)

  return (
    <div>
        <Categories />
        <Container>
            {/* <Wrapper> */}
            { mens.map(item => {
                return(
                    <ImageDiv>
                        <Img src={item.image} />
                    </ImageDiv>
                )
            })
        }
            {/* </Wrapper> */}

        </Container>
    </div>
  )
}

export default Mens