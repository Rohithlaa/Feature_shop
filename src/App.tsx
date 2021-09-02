import {useState} from 'react'
import {useQuery} from 'react-query'

//Components
import Item from './item/Item';
import Cart from './Cart/Cart';
import { Drawer } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import { AddShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';

// Styles 
import {Wrapper} from './App.styles'
import { StyledButton } from './App.styles';

export type CartItems = {
  id:number;
  category:string;
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number;

}


const getProducts = async (): Promise<CartItems[]> => (
  await (await fetch("https://fakestoreapi.com/products")).json()
)


const App = () =>  {

  const [CartOpen, setCartOpen] = useState(false)
  const [Cartitem, setCartItem] = useState([] as CartItems[])
 
  const  {data, isLoading, error} = useQuery<CartItems[]>('products', getProducts)
 
  // console.log(data)

  // ClickedItem: CartItems


   // ADDING ITEMS TO CART

  const handleAddToCart = (clickedItem: CartItems) => {
      setCartItem(prev1 => {
        
        const isItemInCart = prev1.find( item => item.id === clickedItem.id)
        if(isItemInCart){
          return prev1.map( item => 
            item.id === clickedItem.id ?
            { ...item, amount: item.amount + 1}
            : item
            );
        }
        // First time the item is added

        return [ ...prev1, {...clickedItem, amount: 1}]


      })
  };

  const getTotalItems = (items: CartItems[]) => 
      items.reduce( (ack:number, item) => ack + item.amount, 0)
    
  // console.log(getTotalItems)


  const handleRemoveCart = (id:number) => {
    setCartItem( prev => (
      prev.reduce( (ack, item) => {
        if(item.id === id ){
          if(item.amount === 1) return ack;
          return [ ...ack,{ ...item, amount: item.amount - 1}]

        } else{
          return [ ...ack, item]
        }

      }, [] as CartItems[])
      ));
  };
  
   if(isLoading) return <LinearProgress />
   if(error) return <div >Something went wrong...</div>

  return (
    <Wrapper>
       <Drawer anchor='right' open={CartOpen}  onClose={ () => setCartOpen(false)}>
        <Cart CartItems={Cartitem} addtoCart={handleAddToCart} removeFromCart={handleRemoveCart}/>
       </Drawer>
      <StyledButton onClick={ () => setCartOpen(true)}>
        <Badge badgeContent={ getTotalItems(Cartitem)} color='error'>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
       <Grid container spacing={3}> 
          { data && data.map( item => (
            <Grid item key = {item.id} xs ={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />

            </Grid>

          ))}
        </Grid>
    </Wrapper>
  );
}

export default App;
