import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import style from 'styled-components'
import { homeslide } from '../data';
import favpngdress1 from '../img/favpngdress1.png';
import favpngdress2 from '../img/favpngdress2.png';
import favpngpant1 from '../img/favpngpant1.png';

const Container = style.div`
display: flex;
width: 100%;
position: relative;
height: 100vh;
// background-color: yellow;
// overflow: hidden`   //Hide other images in slider
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
const Title = style.h1`font-size: 60px;`
const Description = style.p`margin-top: 50px; letter-spacing: 5px; font-size: 20px`
const Button = style.button`margin-top: 50px;`
const Wrapper = style.div`
height: 100%; 
display: flex;
transform: translateX(${(props)=>props.slide * -100}vw)`

const ImageContainer = style.div`
flex: 1; 
height: 100%;
text-align: right;
// background-color: orange;
// border: 3px solid;`
const InfoContainer = style.div`
flex: 1;
;
padding: 50px;`
const Image = style.img`  
height: 80%;
padding-top: 30px;
// border: 1px solid;`
const Slide = style.div`
display: flex;  
width: 100vw;
height: 100vh;`

function Slider(props) {

  const[slide, setSlide] = useState(0);
  function handleClick(direction){
    if(direction === 'left'){ setSlide(slide > 0? slide - 1 : 2) }
    else { setSlide(slide < 2? slide + 1 :  0) } 
  }
  return (
   <Container>
     <Arrow direction='left' onClick={(e)=>handleClick('left')}>
       <FontAwesomeIcon icon={faChevronLeft}  />
     </Arrow>
     <Wrapper slide={slide}>
       {homeslide.map(item => 
               <Slide>
               <ImageContainer>
                  <Image src={item.img}/>
               </ImageContainer>
               <InfoContainer>
                  <Title>{item.title}</Title>
                  <Description>{item.description}</Description>
                  <Button>Shop Now</Button>
               </InfoContainer>
            </Slide>
            )}
     </Wrapper>

     <Arrow direction='right' onClick={(e)=> handleClick('right')}>
        <FontAwesomeIcon icon={faChevronRight}  />
     </Arrow>
    </Container>
  )
}


export default Slider
