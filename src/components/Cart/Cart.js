import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://http-request-10706-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
  };

  const cartItems = [
    cartCtx.items.map((item) => (
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onAdd={cartItemAddHandler.bind(null, item)}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
      />
    )),
  ];

  const orderHandler = () => {
    setCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={() => props.hideCartHandler()}
        className={classes["button--alt"]}
      >
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={() => props.hideCartHandler()}
        />
      )}
      {!checkout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending Order data....</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button
        onClick={() => props.hideCartHandler()}
        className={classes.button}
      >
        Close
      </button>
    </div>
    </>
  );

  return (
    <>
      <Modal hideCartHandler={props.hideCartHandler}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
    </>
  );
};

export default Cart;
