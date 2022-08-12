import React from 'react';
import Fav from '../Fav/Fav.jsx'
import {Link, useHistory} from "react-router-dom";
import './Card.scss'
import { useSelector } from "react-redux";
import ButtonAddCart from '../ShopingCar/ButtonAddCart.jsx';
import clienteAxios from '../../config/axios.js';

const Cards = (products)=>{
    // console.log(products.id)
    // let idProduct = products.id
    const {profile} = useSelector(state=>state.userReducer)
    let history = useHistory()

    async function handleClick(product){
        console.log(product)
        // e.preventDefault()
        let id_cart = localStorage.getItem("id_cart")

            if (!id_cart) {
              let{data} = await clienteAxios.post("/shoping")
              localStorage.setItem("id_cart", data._id)
            }
            id_cart = localStorage.getItem("id_cart")
          
        await clienteAxios.post(`/shoping/insert-product/${id_cart}`, product)
        history.push("/shoping-car")
  
    }
    
    return (

        <div className = 'principalContainer'>  
            <div className = 'cardContent'>
                 {
                profile?._id &&  !products.list &&
                <div className="Favorito">
                    <Fav id={products._id} profile={profile}></Fav>
                </div>
                }
                { products.list &&
                    <div className='buttonX'>
                    <button className='x' onClick={(e) => products.handleClick(e, products.id_fav)}>x</button>
                    </div>
                }

                <div className = 'image'>
                    <img src={products.image} alt='img not found' />
                </div>
                <div className='namePro'>
                    <h3>{products.name}</h3>
                </div>
                
                <div className = 'cardText'>
                    <h4>${products.price}.00</h4>
                    {/* <Link to={`/detail/${products.id}`} className='detailsButton'> */}
                    <button onClick={()=>handleClick(products)}>Agregar</button>
                    {/* <h2>{products.seller}</h2> */}
                    {/* <p>{products.sales} ventas</p> */}
                    <Link to={`/detail/${products._id}`} className='detailsButton'>

                        <button>ver mas</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cards;