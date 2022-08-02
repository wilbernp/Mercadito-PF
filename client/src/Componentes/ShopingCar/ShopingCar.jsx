import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { Link } from "react-router-dom";
import CardShoping from './CardShoping';
import { useSelector } from 'react-redux';

import './ShopingCard.scss';

export default function ShopingCar() {

  const {profile} = useSelector(state=>state.userReducer)

  let [shoping, setShoping]=useState({})
  let [refres, setRefres] = useState(true)
  let id_cart = localStorage.getItem("id_cart")

  async function handleClick(_id){
    await clienteAxios.delete(`/shoping/delet-product/${id_cart}`,{data: {_id}})
    setRefres(!refres)
  }

  async function updateCantidad(cantidad, id){
    console.log(cantidad)
    let updated =await clienteAxios.put(`/shoping/${id}`, {
      cantidad
  })
  console.log(updated)
    setRefres(!refres)
  }

  useEffect(() => {
        (
      async function () {
        const { data } = await clienteAxios.get(`/shoping/${id_cart}`)
        setShoping(data)
        // console.log(data)

      }
    )()

  }, [refres])
  return (

    <div className='shopContainer'>
      <div className='carShop'>
        <h1 className='miCarrito'>Mi carrito</h1>
      {
        shoping.products &&  shoping.products.map(product =>{
            return(
            <div>
              <CardShoping updateCantidad={updateCantidad}  {...product}  handleClick={handleClick}/>
            </div>
              
            )
        })
      }
      </div>

      {
        shoping.calc?
        <div className='containerRes'>
          <h1>Resumen del pedido</h1>
          <h3> Total de productos: <a>{shoping.calc.totalProducts}</a></h3>
          <h3>Subtotal: <a>${shoping.calc.subTotal}</a></h3>
          <h3>Impuestos (15%): <a>${shoping.calc.impuestos}</a></h3>
          <h3>Precio total: <a>${shoping.calc.totalPrice}</a></h3>
          <div className='buttonContainer'>
            <Link to={profile._id?"/FormBuy":"/login"}><button>verificar</button> </Link>
          </div>
        </div>
        :
        <h1 className='noProducts'>No tienes productos en tu carrito</h1>
      }
  
   </div>
  )
}
