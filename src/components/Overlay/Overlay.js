import React, {useContext} from 'react';
import check from "../images/check.png";
import box from "../images/box.png";
import {CustomContext} from "../../Context";
import './overlay.scss'


const Overlay = () => {

    const {popup,setPopup,cart,framed,deleteBasket,setFramed} = useContext(CustomContext)

    return (
        <div className="overlay" style={{display:popup ? 'block' : 'none'}}>
            <div className="drawer">
                <div className="drawer__basket">
                    <h2 className="drawer__basket-title">Корзина</h2>
                    <span className="drawer__basket-close" onClick={()=> setPopup(!popup)}>x</span>
                </div>
                {cart.length !== 0
                    ? <>
                        {!framed ?
                            <>
                                {cart.map((el)=>(
                                    <div key={el.id} className="drawer__cart">
                                        <img className="drawer__cart-img" src={el.imageUrl} alt={el.title}/>
                                        <div>
                                            <h4 className="drawer__cart-title">{el.title}</h4>
                                            <p className="drawer__cart-price">{el.price} руб.</p>
                                        </div>
                                        <button className="drawer__cart-close" onClick={()=> deleteBasket(el.id)}>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <div className="drawer__total">
                                    <span className="drawer__total-price">Итого.........................................<p>{cart.reduce((acc,rec)=>acc + (rec.price * rec.counter),0)}рубл.</p></span>
                                    <button className="drawer__total-btn" onClick={()=> setFramed(true)}>Оформить заказ <span><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7H14.7143" stroke="white"/>
<path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white"/>
</svg></span></button>
                                </div>
                            </>
                            : <div className="drawer__framed">
                                <img className="drawer__img" src={check} alt=""/>
                                <h3 className="drawer__framed-title">Заказ оформлен!</h3>
                                <p className="drawer__framed-subtitle">Ваш заказ #{Math.round(Math.random() * 100)} скоро будет передан курьерской доставке</p>
                                <button onClick={()=> setFramed(false)} className="drawer__framed-btn" type="button"><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.7144 7L1.00007 7" stroke="white"/>
                                    <path d="M7 13L1 7L7 1" stroke="white"/>
                                </svg>
                                    Вернуться назад</button>
                            </div>
                        }
                    </>
                    : <div className="drawer__zero">
                        <img src={box} alt="box"/>
                        <h3 className="drawer__zero-title">Корзина пустая</h3>
                        <p className="drawer__zero-subtitle">Добавьте хотя бы одну пару <br/> кроссовок, чтобы сделать заказ.</p>
                        <button onClick={()=> setPopup(false)} className="drawer__zero-back"><span><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.7144 7L1.00007 7" stroke="white" />
<path d="M7 13L1 7L7 1" stroke="white" />
</svg ></span>Вернуться назад</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Overlay;