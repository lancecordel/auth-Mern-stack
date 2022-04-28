import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from 'styled-components'
import { homeslide } from '../data';
import favpngdress1 from '../img/favpngdress1.png';
import favpngdress2 from '../img/favpngdress2.png';
import favpngpant1 from '../img/favpngpant1.png';

const Container = style.div`
display: flex;
width: 100%;
margin: 90px 0 0 0;
position: relative;
height: 100vh;
background-color: rgba(${props => props.backgroundColor},0.2);
overflow: hidden;
// z-index: -1;` 

const Arrow = style.div`
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
margin: auto;
cursor: pointer;
left: ${props=> props.direction === 'left' && '10px'};
right: ${props=> props.direction === 'right' && '10px'};`

const Title = style.h1`
font-size: 60px;
padding-top: 5vh;`

const Description = style.p`
padding-top: 6vh; 
padding-bottom: 6vh;
letter-spacing: 5px; 
font-size: 20px`

const Button = style.button`
font-size: 15px;
padding: 3vh;
background-color: white;`

const Wrapper = style.div`
height: 100%; 
display: flex;
transition: all 800ms ease;
transform: translateX(${(props)=>props.slide * - 100}vw)`

const ImageContainer = style.div`
flex: 1; 
display: flex;
height: 100%;
justify-content: center;
// background-color: orange;
// border: 3px solid;`

const InfoContainer = style.div`
flex: 1;
padding-top: 4vh;`

const Image = style.img`  
height: 80%;
padding-top: 60px;
// border: 1px solid;`

const Slide = style.div`
display: flex;  
width: 100vw;
height: 100vh;`

function Slider(props) {
  const navigate = useNavigate();
  const[slide, setSlide] = useState(0);

  const homeImages = [favpngdress2, favpngdress1, favpngpant1];
  const bgColor = ['205,92,55', '134, 158, 148', 'yellow'];

  function handleSlide(direction){
    if(direction === 'left'){setSlide(slide > 0 ? slide - 1 : 2)
      console.log('slide',slide)
    }
    else { setSlide(slide < 2? slide + 1 :  0) } 

  }

  function handleSubmit(event){
    event.preventDefault();
    navigate('/categories');
  }

  return (
   <Container backgroundColor={bgColor[slide]}>
     <Arrow direction='left' onClick={(e)=>handleSlide('left')}>
       <FontAwesomeIcon icon={faChevronLeft}  />
     </Arrow>
     <Wrapper slide={slide}>
       {homeslide.map(item => 
               <Slide>
               <ImageContainer >
                  <Image src={homeImages[slide]}/>
               </ImageContainer>
               <InfoContainer>
                  <Title>{item.title}</Title>
                  <Description>{item.description}</Description>
                  <Button onClick={(e)=> handleSubmit(e)} >SHOP NOW</Button>
               </InfoContainer>
            </Slide>
            )}
     </Wrapper>

     <Arrow direction='right' onClick={(e)=> handleSlide('right')}>
        <FontAwesomeIcon icon={faChevronRight}  />
     </Arrow>
    </Container>
  )
}


export default Slider
