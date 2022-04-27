import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Categories from './Categories'
import styled from 'styled-components';
import ItemCard from './ItemCard';

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

const ImageDiv = styled.div`
flex: 1;
display: flex;
justify-content: center;
padding: 10px;
// border: 1px solid;
// width: 10%;
height: 60%;
`

function SearchResults(props) {
    const navigate = useNavigate();    
    const [info, setInfo] = useState([])
    const [results, setResults] = useState([])
    console.log(props.results)




    useEffect(()=> {
    },[])

  return (
    <div>
        <Categories />
        <Container>
            {/* <Wrapper> */}
            { props.results.map(item => {
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
            {/* </Wrapper> */}

        </Container>
        <h1>Womens Page</h1>
    </div>
  )
}

export default SearchResults