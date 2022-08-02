import React, { useState } from 'react';
import clienteAxios from '../../config/axios';
import './Fav.modules.scss'
import heart_t from '../icons/wishlist.png'
import heart_a from '../icons/love.png'

// const {data}= await clienteAxios.get(`/favorites/${idproducto}?user=${profile?.name}`)
function Fav({id}) {

  let [agregate, setAgregate] = useState(false)

  const requestOptions = {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`
  }
  };  
  const handleClick = async ()=>{
    console.log('click')
      try{
      
      const {data} = await clienteAxios.get(`/favorites/${id}`)

      if (data) {
        await clienteAxios.delete(`/favorites/${data._id}`)
        setAgregate(false)
        // alert('se elimino de favoritos')
        return
      }
      await clienteAxios.post(`/favorites/${id}`, {}, requestOptions)
      setAgregate(true)
        // alert('se añadio a favoritos')
      }
      catch(e){
        console.log(e)
      }}
  return (
    <button className="btn_fav" onClick={handleClick}>
        {/* <span aria-label='Fav-gif' role='img'>🧡</span> */}
        <img src={agregate?heart_a:heart_t}/>
    </button>
  )
}

export default Fav