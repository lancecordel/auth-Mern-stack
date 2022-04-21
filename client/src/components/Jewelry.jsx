import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Categories from './Categories'
import styled from 'styled-components';

const Container = styled.div`
// flex: 1;
display: flex;
flex-wrap: wrap;
align-items: top;
justify-content: center;
// border: 6px solid;
width: 95vw;
height: 90vh;
margin: 20px;
margin-top: 50px;
`

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
// width: 10%;
height: 40%;
`

// const Wrapper = styled.div`
// display: flex;
// flex-wrap: wrap;
// justify-content: space-around;
// width: 90%;
// border: 3px solid;`

function Jewelry() {
    const navigate = useNavigate();    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState([])
    const [jewelry, setJewelry] = useState([])

    async function fetchData(){
      try{
        const product = await axios.get("https://fakestoreapi.com/products")
        const { data } = product;
        // console.log(data)

        const jewel = data.filter(product => product.category === "jewelery")
    
        setJewelry(jewel)
        setInfo(data);
      } catch(err) {
        console.error('error', err.message)
      }
    }
    useEffect(()=> {
        fetchData();
    },[])

  return (
    <div>
        <Categories />
        <Container>
            {/* <Wrapper> */}
            { jewelry.map(item => {
                return(
                    <ImageDiv>
                        <Img src={item.image} />
                    </ImageDiv>
                )
            })
        }
            {/* </Wrapper> */}

        </Container>
        <h1>Womens Page</h1>
    </div>
  )
}

export default Jewelry