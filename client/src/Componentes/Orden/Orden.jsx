import React from 'react'
import { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { useSelector, useDispatch, connect } from 'react-redux'
import {Link,useParams} from 'react-router-dom';
import { ordenP } from '../FormBuy/FormBuy';
import Paypal from '../Paypal/Paypal';

import './Orden.scss'

export default function Orden() {
  const[ordernP, setOrdenP] = useState({})
  let id_cart = localStorage.getItem("id_cart")
    // const [idPaypal, setIdPaypal] = useState([])


    useEffect(()=>{
      (
          async function(){
              const {data} = await clienteAxios.get(`/shoping/${id_cart}`)
              setOrdenP(data,"oo")
              console.log(data)
          }
      )()
  },[])
  //  async function handlesubmit(){
  //   await clienteAxios.post(`/paypal/create-payment`)

  //  }  
    return (
        <div className='ordenContainer'>
          <div className='subOrden'>
              {
                ordernP.products && ordernP.products.map(product =>(
                  <div className='it'>
                      <h2>Producto: {product.name}</h2>
                      <h3>Cantidad: {product.cantidad}</h3>
                      <h3>Stock: {product.stock}</h3>
                      <h3>Price: {product.price}</h3>
                  </div>
                  ))
                }
            {
              ordernP.user &&
            <div className='user'>
              <h3><a>Nombre:</a> {ordernP.user.nombre}</h3>
              <h3><a>Apellido:</a> {ordernP.user.apellido}</h3>
              <h3><a>Direccion:</a> {ordernP.user.direccion}</h3>
              <h3><a>Codigo Postal:</a> {ordernP.user.codigoPostal}</h3>
              <h3><a>Ciudad:</a> {ordernP.user.ciudad}</h3>
              <h3><a>Pais:</a> {ordernP.user.pais}</h3>
              <h3><a>Telefono:</a> {ordernP.user.telefono}</h3>       
            </div>
          } 
        
            {
            ordernP.calc &&
              <div className='calc'>
                <h3><a>Subtotal:</a> {ordernP.calc.subtotal}</h3>
                <h3><a>Total Products:</a> {ordernP.calc.total}</h3>
                <h3><a>Impuestos:</a> $ {ordernP.calc.impuestos}</h3>
                <h3><a>Precio Total:</a> $ {ordernP.calc.totalPrice}</h3>
              </div>
            } 

            <Paypal/>
          </div>
                {/* subtotal:Number, 
        total:Number,
        impuestos:Number, 
        totalPrice:Number, */}
        </div>

    )
}