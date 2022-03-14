import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) =>{
      cartCtx.removeItem(id);
  }

  const cartItemAddHandler = (item) =>{
      cartCtx.addItem({...item, amount:1})
  }

  const cartItems = [
    cartCtx.items.map((item) => (
      <CartItem 
      key={item.id} 
      name={item.name} 
      price={item.price} 
      amount={item.amount} 
      onAdd ={cartItemAddHandler.bind(null, item)}
      onRemove ={cartItemRemoveHandler.bind(null, item.id)}
      />
    )),
  ];

  return (
    <>
      <Modal hideCartHandler={props.hideCartHandler}>
        <ul className={classes["cart-items"]}>{cartItems}</ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() => props.hideCartHandler()}
            className={classes["button--alt"]}
          >
            Close
          </button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
      </Modal>
    </>
  );
};

export default Cart;
