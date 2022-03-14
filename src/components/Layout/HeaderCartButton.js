import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../Store/cart-context'

const HeaderCartButton = props =>{
    const [highlightBtn, setHighlightBtn] = useState(false)

    const cartCtx = useContext(CartContext)
    
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=>{
        return curNumber + item.amount
    }, 0);

    const {items} = cartCtx
    
    const btnClasses = `${classes.button} ${highlightBtn ? classes.bump : ''}`

    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setHighlightBtn(true);

       const timer = setTimeout(()=>{
           setHighlightBtn(false)
       }, 300)

       return ()=>{
           clearTimeout(timer)
       }

    }, [items])

    return <button onClick={() => props.showCartHandler()} className={btnClasses}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{ numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton