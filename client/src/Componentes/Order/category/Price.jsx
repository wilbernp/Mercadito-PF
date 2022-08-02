import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { update_querys_order, update_url } from '../../../redux/actions'

import './OrderCategory.scss'

export default function Price() {

    let dispatch = useDispatch()
    let orders = ["minimo", "maximo"]

    //  modifica el estado global [url] para que home haga una nueva peticion a la url del estado
    // global
    function handleClick(e, order) {
        e.preventDefault()
        if (order === "minimo") {
            dispatch(update_querys_order("sort=price&order=asc"))
            dispatch(update_url())
        }
        if (order === "maximo") {
            dispatch(update_querys_order("sort=price&order=desc"))
            dispatch(update_url())
        }
    }
    return (
        <div>
            <div className='category'>
                <h4>Precio</h4>
                {
                    orders.map((order, i) => {
                        return (
                            <div key={i} onClick={(e) => handleClick(e, order)} className='sub-category'>
                                <Link to="/" className='link'>{order}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
