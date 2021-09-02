import { Wrapper } from "./item.styles";

import { Button } from "@material-ui/core";
import { CartItems } from "../App";


type Props = {
    item: CartItems,
    handleAddToCart: (clickeitem : CartItems) => void;
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => (
    <Wrapper>

         <img src={item.image} alt={item.title}/>
         <div>
             <h3>{item.title}</h3>
             <p>{item.description}</p>
             <h3>${item.price}</h3>
         </div>
         <Button onClick={ () => handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper>
    
)


export default Item