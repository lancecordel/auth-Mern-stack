import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import style from 'styled-components'
import favpngdress1 from '../img/favpngdress1.png';
import favpngdress2 from '../img/favpngdress2.png';


const Container = style.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 100vh;
  background-color: yellow;`
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
  right: ${props=> props.direction === 'right' && '10px'};
`
const Wrapper = style.div`width: 100% `

const ImageContainer = style.div`flex: 1; display: flex;  height: 100vh;  
vertical-align: middle;  justify-content: center;`
  
const InfoContainer = style.div``
const Image = style.img`  height: 65%;`
const slide = style.div`display: flex;  align-items: center`

function Slider(props) {
  return (
   <Container>
     <Arrow direction='left'>
       <FontAwesomeIcon icon={faChevronLeft}  />
     </Arrow>
     <Wrapper>
    <ImageContainer>
      <Image src={favpngdress2}/>
    </ImageContainer>
    <InfoContainer>

    </InfoContainer>
     </Wrapper>
     <Arrow direction='right'>
        <FontAwesomeIcon icon={faChevronRight}  />
     </Arrow>
    </Container>
  )
}


export default Slider
