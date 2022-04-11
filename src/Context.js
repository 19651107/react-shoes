import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const CustomContext = createContext()

export const Context = (props) => {

    useEffect(()=>{
        axios('http://localhost:8080/shoes')
            .then(({data})=> setShoes(data))
    },[])

    const [shoes,setShoes] = useState([])
    const [input,setInput] = useState('')
    const [cart,setCart] = useState([])
    const [popup,setPopup] = useState(false)
    const [framed,setFramed] = useState(false)

    const likeHandler = (id) => {
        setShoes(shoes.map((item)=>{
            if (item.id === id){
                return {...item,like:!item.like}
            }else {
                return item
            }
        }))
    }



    const addShop = (item) => {
        let idx = cart.findIndex((el)=> el.title === item.title)
        if (idx <= -1){
            setCart([...cart,{
                ...item,
                counter : 1
            }])
        } else {
            return alert('Вы уже добавили в карзину')
        }
    }

    const deleteBasket = (el) => {
        setCart(cart.filter((item)=> item.id !== el))
    }


    const value = {
        deleteBasket,
        addShop,
        likeHandler,
        cart,
        setCart,
        framed,
        setFramed,
        popup,
        setPopup,
        input,
        setInput,
        shoes,
        setShoes,
    }

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
}