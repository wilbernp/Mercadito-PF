import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import Cards from '../Card/Card'
import '../Home/Home.scss'
import { useSelector } from "react-redux";
export default function ListFav() {
    const {profile} = useSelector(state=>state.userReducer)
    let [state, setState] = useState([])
    let[refres, setRefres]= useState(true)


    async function handleClick(e, id_fav){
        e.preventDefault()
        await clienteAxios.delete(`/favorites/${id_fav}`)
        setRefres(!refres)
    }

    

    const requestOptions = {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    
      };

    useEffect(()=>{
        (
            async function(){
                const {data}= await clienteAxios.get(`/favorites`, requestOptions)
               setState(data)
            }
        )()
    }, [refres])


    return(
        <div className='cardGrid'>

        { state.length? state.map(p =>{
            return(
                <Cards id_fav={p._id} list={true} handleClick={handleClick} image={p.product.image} name={p.product.name} seller={p.product.seller} sales={p.product.sales} price={p.product.price} _id={p.product._id}/>
                )
            }): <h1 className='textFav'>No tienes productos en tu seccion de favoritos</h1>
        }
        </div>
    )
    
  
}
