import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { update_querys_order, update_url } from '../../../redux/actions'

import './OrderCategory.scss'

export default function Alphabet() {
  let dispatch = useDispatch()
     let orders = ["ascendente", "descendente"]

    //  modifica el estado global [url] para que home haga una nueva peticion a la url del estado
    // global
     function handleClick(e, order){
        e.preventDefault()
        if (order === "ascendente") {
            dispatch(update_querys_order("sort=name&order=asc"))
            dispatch(update_url())
        }
        if (order === "descendente") {
            dispatch(update_querys_order("sort=name&order=desc"))
            dispatch(update_url())
        }
     }
  return (
    <div>
        <div className='category'>
            <h4>Nombre</h4>
            {
                orders.map((order, i) =>{
                    return(
                        <div key={i} onClick={(e) => handleClick(e, order)} className='sub-category'>
                            <Link  to="/" className='link'>{order}</Link>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
