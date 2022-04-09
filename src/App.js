import React, {useEffect, useState} from 'react'
import './style.scss'
import Logo from '../src/components/images/Logo.png'
import axios from "axios";
import box from '../src/components/images/box.png'






function App() {

    useEffect(()=>{
        axios('http://localhost:8080/shoes')
            .then(({data})=> setShoes(data))
    },[])

    const [shoes,setShoes] = useState([])
    const [input,setInput] = useState('')
    const [cart,setCart] = useState([])
    const [popup,setPopup] = useState(false)

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

  return (
    <div className="App">
            <div className="overlay" style={{display:popup ? 'block' : 'none'}}>
                <div className="drawer">
                    <div className="drawer__basket">
                        <h2 className="drawer__basket-title">Корзина</h2>
                        <span className="drawer__basket-close" onClick={()=> setPopup(!popup)}>x</span>
                    </div>
                    {cart.length !== 0
                    ? <>
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
                               <button className="drawer__total-btn">Оформить заказ <span><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7H14.7143" stroke="white"/>
<path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white"/>
</svg></span></button>
                           </div>
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
            <div className="container">
              <header className="header">
                  <div className="header__navbar">
                      <div className="header__right">
                          <img src={Logo} alt="shoes"/>
                          <div className="header__right-titles">
                              <h3 className="header__right-title">REACT SNEAKERS</h3>
                              <p className="header__right-subtitle">Магазин лучших кроссовок</p>
                          </div>
                      </div>
                      <div className="header__left">
                          <div className="header__left-logo" onClick={()=> setPopup(!popup)}>
                              <span>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.54548 18.1818C7.99735 18.1818 8.36366 17.8155 8.36366 17.3636C8.36366 16.9118 7.99735 16.5455 7.54548 16.5455C7.09361 16.5455 6.72729 16.9118 6.72729 17.3636C6.72729 17.8155 7.09361 18.1818 7.54548 18.1818Z" stroke="#9B9B9B"/>
<path d="M16.5455 18.1818C16.9973 18.1818 17.3637 17.8155 17.3637 17.3636C17.3637 16.9118 16.9973 16.5455 16.5455 16.5455C16.0936 16.5455 15.7273 16.9118 15.7273 17.3636C15.7273 17.8155 16.0936 18.1818 16.5455 18.1818Z" stroke="#9B9B9B"/>
<path d="M1 1H4.27273L6.46545 11.9555C6.54027 12.3321 6.7452 12.6705 7.04436 12.9113C7.34351 13.1522 7.71784 13.2801 8.10182 13.2727H16.0545C16.4385 13.2801 16.8129 13.1522 17.112 12.9113C17.4112 12.6705 17.6161 12.3321 17.6909 11.9555L19 5.09091H5.09091" stroke="#9B9B9B"/>
</svg>

                          </span>
                              <span title="Нажмите чтобы посмотреть корзину" className="header__left-price">{cart.reduce((acc,rec)=>{
                                  return acc + (rec.price * rec.counter)
                              },0)} руб.</span>
                          </div>
                          <span>
                              <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.1003 0C16.7293 0 18.0976 0.54932 19.2052 1.64796C20.3129 2.7466 20.8668 4.08759 20.8668 5.67092C20.8668 6.44643 20.7039 7.23002 20.3781 8.02169C20.0523 8.81335 19.6939 9.51616 19.303 10.1301C18.912 10.744 18.2523 11.5357 17.3238 12.5051C16.3953 13.4745 15.6134 14.2581 14.9781 14.8559C14.3428 15.4537 13.3248 16.3665 11.9239 17.5944L10.4089 18.9515L8.89403 17.6429C7.52572 16.3827 6.51577 15.4537 5.8642 14.8559C5.21262 14.2581 4.42258 13.4745 3.49408 12.5051C2.56559 11.5357 1.90586 10.744 1.51492 10.1301C1.12397 9.51616 0.773748 8.81335 0.464249 8.02169C0.15475 7.23002 0 6.44643 0 5.67092C0 4.08759 0.553841 2.7466 1.66152 1.64796C2.7692 0.54932 4.12123 0 5.71759 0C7.60717 0 9.17095 0.727041 10.4089 2.18112C11.6469 0.727041 13.2107 0 15.1003 0ZM10.5067 16.0918C12.1031 14.6701 13.2677 13.6118 14.0008 12.9171C14.7338 12.2224 15.5401 11.3903 16.4198 10.4209C17.2994 9.45153 17.9102 8.60332 18.2523 7.87628C18.5944 7.14924 18.7654 6.41412 18.7654 5.67092C18.7654 4.63691 18.4152 3.78061 17.7148 3.10204C17.0143 2.42347 16.1428 2.08418 15.1003 2.08418C14.3184 2.08418 13.5772 2.31037 12.8768 2.76276C12.1764 3.21514 11.6795 3.79677 11.3863 4.50765H9.43158C9.17095 3.79677 8.69041 3.21514 7.98997 2.76276C7.28952 2.31037 6.53206 2.08418 5.71759 2.08418C4.67507 2.08418 3.81173 2.42347 3.12757 3.10204C2.44342 3.78061 2.10134 4.63691 2.10134 5.67092C2.10134 6.41412 2.26423 7.14924 2.59002 7.87628C2.91581 8.60332 3.52666 9.45153 4.42258 10.4209C5.3185 11.3903 6.13297 12.2224 6.866 12.9171C7.59902 13.6118 8.74743 14.6701 10.3112 16.0918L10.4089 16.1888L10.5067 16.0918Z" fill="#9B9B9B"/>
</svg>
                          </span>
                          <span>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10C0 4.579 4.579 0 10 0C15.421 0 20 4.579 20 10C20 13.19 18.408 16.078 16 17.924V18H15.898C14.23 19.245 12.187 20 10 20C7.813 20 5.77 19.245 4.102 18H4V17.924C1.592 16.078 0 13.189 0 10ZM7.12347 15.236C6.59154 15.6639 6.22136 16.2604 6.074 16.927C7.242 17.604 8.584 18 10 18C11.416 18 12.758 17.604 13.926 16.927C13.7785 16.2605 13.4082 15.6641 12.8764 15.2362C12.3445 14.8083 11.6827 14.5744 11 14.573H9C8.3173 14.5742 7.6554 14.808 7.12347 15.236ZM13.7677 13.4117C14.5877 13.9574 15.2286 14.7329 15.61 15.641C17.077 14.182 18 12.176 18 10C18 5.663 14.337 2 10 2C5.663 2 2 5.663 2 10C2 12.176 2.923 14.182 4.39 15.641C4.77144 14.7329 5.41227 13.9574 6.23227 13.4117C7.05227 12.866 8.01501 12.5742 9 12.573H11C11.985 12.5742 12.9477 12.866 13.7677 13.4117ZM6 8C6 5.72 7.72 4 10 4C12.28 4 14 5.72 14 8C14 10.28 12.28 12 10 12C7.72 12 6 10.28 6 8ZM8 8C8 9.178 8.822 10 10 10C11.178 10 12 9.178 12 8C12 6.822 11.178 6 10 6C8.822 6 8 6.822 8 8Z" fill="#9B9B9B"/>
</svg>
                          </span>
                      </div>
                  </div>
              </header>
                <section className="search">
                    <div className="search__card">
                        <h2 className="search__trainer">Все кроссовки</h2>
                        <div>
                            <span className="search__card-svg">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4"/>
                        </svg>
                            </span>
                            <input value={input} className="search__input" type="search" placeholder="Пойск..." onChange={(e)=> {
                                setInput(e.target.value)
                            }}/>
                        </div>
                    </div>
                </section>
                <section className="trainers">
                    <div className="trainers__row">
                        {shoes.filter((el)=> el.title.startsWith(input)).map((item)=>(
                            <div key={item.id} className="trainers__card">
                                <span className="trainers__card-like" onClick={()=> likeHandler(item.id)}>
                                    {item.like ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="32" height="32" rx="7" fill="#FEF0F0"/>
                                            <path d="M22.5849 12.2231C22.3615 11.7098 22.0394 11.2446 21.6365 10.8537C21.2333 10.4615 20.758 10.1499 20.2363 9.93576C19.6954 9.7128 19.1152 9.59868 18.5295 9.60002C17.7077 9.60002 16.906 9.82329 16.2092 10.245C16.0425 10.3459 15.8842 10.4567 15.7342 10.5775C15.5841 10.4567 15.4258 10.3459 15.2591 10.245C14.5624 9.82329 13.7606 9.60002 12.9388 9.60002C12.3471 9.60002 11.7737 9.71248 11.232 9.93576C10.7086 10.1508 10.2369 10.46 9.83181 10.8537C9.42843 11.2442 9.10619 11.7095 8.88337 12.2231C8.65168 12.7573 8.53333 13.3246 8.53333 13.9084C8.53333 14.4592 8.64668 15.0331 8.8717 15.6169C9.06006 16.1048 9.33009 16.6109 9.67513 17.122C10.2219 17.9307 10.9736 18.7742 11.9071 19.6293C13.4539 21.0467 14.9857 22.0258 15.0507 22.0655L15.4458 22.3169C15.6208 22.4277 15.8458 22.4277 16.0209 22.3169L16.4159 22.0655C16.4809 22.0242 18.0111 21.0467 19.5596 19.6293C20.493 18.7742 21.2448 17.9307 21.7915 17.122C22.1366 16.6109 22.4083 16.1048 22.5949 15.6169C22.82 15.0331 22.9333 14.4592 22.9333 13.9084C22.935 13.3246 22.8166 12.7573 22.5849 12.2231Z" fill="#FF8585"/>
                                        </svg>
                                        : <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" fill="white" stroke="#F8F8F8"/>
                                            <path d="M21.149 11.356L21.1484 11.3554C20.8095 11.0258 20.4097 10.7636 19.9705 10.5833L19.9696 10.5829C19.5139 10.3951 19.0249 10.2989 18.5311 10.3L18.5295 10.3C17.8346 10.3 17.1584 10.4887 16.5717 10.8438L16.5717 10.8439C16.4313 10.9288 16.2985 11.0218 16.173 11.1228L15.7341 11.476L15.2953 11.1228C15.1698 11.0218 15.037 10.9288 14.8966 10.8439L14.8966 10.8438C14.3099 10.4887 13.6337 10.3 12.9388 10.3C12.4373 10.3 11.9546 10.395 11.4987 10.5829L11.498 10.5832C11.057 10.7644 10.6606 11.0243 10.3197 11.3556L10.3187 11.3566L10.3187 11.3566C9.98111 11.6834 9.71174 12.0725 9.52557 12.5016L21.149 11.356ZM21.149 11.356C21.4865 11.6835 21.7561 12.0729 21.943 12.5022C22.1365 12.9487 22.2347 13.4204 22.2333 13.9064V13.9084C22.2333 14.3625 22.1399 14.8512 21.9418 15.3651L21.9412 15.3667M21.149 11.356L21.9412 15.3667M12.3799 19.1131L12.38 19.1132C13.1291 19.7996 13.8773 20.3822 14.4475 20.7988C14.732 21.0066 14.9709 21.1721 15.1415 21.2873C15.2268 21.345 15.2948 21.3899 15.3428 21.4212C15.3857 21.4492 15.4091 21.464 15.4144 21.4673C15.4154 21.4679 15.4158 21.4682 15.4155 21.468L15.4266 21.4748L15.4266 21.4749L15.7333 21.6701L16.0401 21.4749L16.0402 21.4748C16.0914 21.4423 17.5822 20.4902 19.0868 19.1131H12.3799ZM12.3799 19.1131C11.4753 18.2845 10.7634 17.4818 10.255 16.7299M12.3799 19.1131L10.255 16.7299M21.9412 15.3667C21.7771 15.7954 21.5328 16.2542 21.2114 16.7303M21.9412 15.3667L21.2114 16.7303M10.255 16.7299C9.93467 16.2553 9.69124 15.796 9.52486 15.3651L10.255 16.7299ZM21.2114 16.7303C20.7031 17.482 19.9913 18.2845 19.087 19.1129L21.2114 16.7303ZM9.23333 13.9084C9.23333 13.4208 9.33184 12.9483 9.52554 12.5017L9.52472 15.3648C9.32672 14.851 9.23333 14.3624 9.23333 13.9084Z" stroke="#ECECEC"/>
                                        </svg>}
                                </span>
                                <img className="trainers__img" src={item.imageUrl} alt="shoes"/>
                                <h3 className="trainers__title">{item.title}</h3>
                                <div className="trainers__prices">
                                    <div className="trainers__prices-subprice">
                                        <span className="trainers__prices-price">Цена:</span>
                                        <p className="trainers__prices-cost">{item.price}</p>
                                    </div>
                                    <span className="trainers__prices-plus" onClick={()=> addShop(item)}>+</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
    </div>
  );
}

export default App;
