import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Categories from './Categories'
import styled from 'styled-components';
import ItemCard from './ItemCard';


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
// flex: 1;
display: flex;
justify-content: center;
padding: 10px;
// border: 1px solid;
// width: 30%;
height: 70%;`


function Mens() {
    const navigate = useNavigate();    
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState([])
    const [mens, setMens] = useState([])

    const params = useParams();

    function handleClick(event){
      const val = event.target.getAttribute('value').toLowerCase();
      console.log('clicked',val)
      console.log('use Params Clicked', params)
      // navigate(`/categories/${val}`)
    }


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
        console.log("loading")
    },[])
    console.log(mens)

  return (
    <div>
        <Categories />
        <Container>
            { mens.map(item => {
                return(
                    <ImageDiv>
                        <ItemCard 
                        image={item.image} 
                        title={item.title}
                        price={item.price}
                        id={item.id} />
                    </ImageDiv>
                )
            })
        }
        </Container>
    </div>
  )
}

export default Mens