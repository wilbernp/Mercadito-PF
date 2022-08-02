import React from 'react';
import clienteAxios from '../../config/axios';
import delet from '../icons/trash.png'
import './ShopingCard.scss';

export default function CardShoping(product) {
  console.log(product.cantidad)
  return (
    <div className='containerCardShop'>
      <button className='deleteButton' onClick={()=> product.handleClick(product._id)}><img src={delet}/>eliminar</button>
      <h1 className='name'>{product.name}</h1>
      <h3>Precio: <a>${product.price}</a></h3>
      <h3>Disponibles: {product.stock} unidades</h3>

      <div className='contadorContainer'>
        <button className='decrement' 
        disabled ={product.cantidad === 1} 
        onClick={()=> product.updateCantidad(product.cantidad-1, product._id)}>-</button>
        <h1>{product.cantidad}</h1>
        <button className='increment' 
        disabled ={product.cantidad === product.stock} 
        onClick={()=> product.updateCantidad(product.cantidad+1, product._id)}>+</button>
      </div>
     
    </div>

    
  )
}