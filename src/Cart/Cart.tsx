import CartItem from "../CartItem/CartItem";
import { Wrapper } from './cart.styles';

import { CartItems } from "../App";

type Props = {
    CartItems: CartItems[];
    addtoCart: (clickedItem: CartItems) => void;
    removeFromCart: (id:number) => void;
}

const Cart: React.FC<Props> = ( {CartItems , addtoCart, removeFromCart}) => {

    const calculateTotal = ( items: CartItems[]) => 
     items.reduce( (ack:number, item) => ack + item.amount * item.price, 0)

    return (
            <Wrapper>
                <h2>Your Cart</h2>
                { CartItems.length == 0 ?  <p>No Items in cart</p> : null}
                {CartItems.map( item => (
                    <CartItem 
                        key={item.id}
                        item={item}
                        addtoCart = {addtoCart}
                        removeFromCart = {removeFromCart}
                    
                    
                    />
                ))}
                <h2>Total: $ {calculateTotal(CartItems).toFixed(2)}</h2>
            </Wrapper>

    )
}

export default Cart;