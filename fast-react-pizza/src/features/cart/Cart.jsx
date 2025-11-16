import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from "./EmptyCart"


function Cart() {
  const cart = useSelector(getCart);
  const dispatch = useDispatch()
  const username = useSelector((state)=> state.user.username)

  if(!cart.length) return <EmptyCart />
  return (
    <div className='py-3 px-4'>
      <LinkButton to="/menu">
      &larr; Back to menu
      </LinkButton>

      <h2 className='mt-6 text-2xl font-semibold'>Your cart, {username}</h2>

      <ul className='divide-y divide-stone-200'>{cart.map((item)=> <CartItem item={item} key={item.pizzaId}/>)}</ul>

      <div className='mt-4 space-x-2'>
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button type="secondery" onClick={()=>dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
