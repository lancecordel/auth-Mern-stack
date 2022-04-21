
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Electronics from './Electronics';
import Jewelery from './Jewelry';
import Mens from './Mens';
import Womens from './Womens';

const Container = styled.div`
flex: 1;
display: flex;
margin: 60px 30px 20px 30px ;
justify-content: space-between;
// border: 1px solid;`

const CategoryCard = styled.div`
flex: 1;
display: flex;
letter-spacing: 2px;
justify-content: center;
font-weight: bold;
font-size: 20px;
margin: 8px;
border-radius: 20px;
border: .5px solid silver;
// box-shadow: 0 3px;
`

const Main = styled.div`
display: flex;`

  function Categories(props){
    const navigate = useNavigate();    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState([])
    const [electronics, setElectronics] = useState([])
    const [mens, setMens] = useState([])
    const [womens, setWomens] = useState([])
    const [jewelery, setJewelery] = useState([])

    async function fetchData(){
      try{
        const product = await axios.get("https://fakestoreapi.com/products")
        const { data } = product;
        // console.log(data)

        const electronic = data.filter(product => product.category === 'electronics')
        const men = data.filter(product => product.category === "men's clothing")
        const women = data.filter(product => product.category === "women's clothing")
        const jewels = data.filter(product => product.category === "jewelery")
    
        setElectronics(electronic);
        setMens(men)
        setWomens(women)
        setJewelery(jewels)
        setInfo(data);
      } catch(err) {
        console.error('error', err.message)
      }
    }

    function handleClick(event){
      const val = event.target.getAttribute('value').toLowerCase();
      console.log('clicked',val)
      navigate(`/categories/${val}`)
    }

    useEffect(() => {
      // setLoading(true)
      fetchData();

    }, [])

    const allCategories = ['MENS', 'WOMENS', 'ELECTRONICS', 'JEWELRY']

    return (
      <Main>
        <Container>
          {allCategories.map(category => {
            return(
              <CategoryCard value={category} onClick={(e)=>handleClick(e)}>
                <p>{category}</p>
              </CategoryCard>
            )
          })}
        </Container>
      </Main>  

            )
        }
        
        export default Categories