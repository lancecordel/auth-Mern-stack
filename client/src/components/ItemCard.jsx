import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Img = styled.img`
// flex: 1;
// height: ;
width: 70%
// border: 1px solid;
`
const ImageDiv = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 10px;
// border: 1px solid;
max-width: 400px;
// width: 30%;
height: 50%;
`
const ItemTitle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
`
const Price = styled.div`
flex: 1
display: flex;
flex-direction:column;
justify-content: flex-start;
font-size: 30px;
text-align: center;
line-height: .1;
color: green;
font-weight: bold;
// border: 1px solid;
`


function ItemCard(props) {
  const navigate = useNavigate();

  return (
      <ImageDiv >
            <Img 
            src={props.image} 
            alt="item" 
            onClick={()=> navigate(`/categories/${props.id}`)} />
        <ItemTitle>
            <p>{props.title}</p>
            <Price>
                 <p>${props.price}</p>
            </Price>
        </ItemTitle>
      </ImageDiv>
    // </div>
  );
}

export default ItemCard;
