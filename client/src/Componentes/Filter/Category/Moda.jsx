import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import clienteAxios from '../../../config/axios'
import { update_querys_filter, update_url } from '../../../redux/actions'

export default function Moda() {
    let [moda, setModa] = useState([])

    let dispatch = useDispatch()
    useEffect(() => {
        // se obtienen las categorias de productos
        (async function () {
            let {data} = await clienteAxios.get('/categories')
            // console.log(res[0].tecnologia[0].name)
            setModa(data[2].sub)
            // console.log(tecnology[0].tecnologia[0].name)
        })()
    }, [])

    //  modifica el estado global [url] para que home haga una nueva peticion a la url del estado
    // global
    function handleClick(e, c) {
        e.preventDefault()
        dispatch(update_querys_filter(`category=${c}`))
        dispatch(update_url())
    }

    return (
        <div>
            <div className='category'>
                <h3>Moda</h3>

                {
                    // el estado local [moda] tiene en la posicion 3 un objeto asi:
                    // {moda:[tipos de moda]} 
                    moda.length && moda.map((c, i) => {
                        return (
                            <li key={i} onClick={(e) => handleClick(e, c.name)} className='sub-category'>
                                <Link to="/" className='link'>{c.name.replaceAll("_", " ")}</Link>
                            </li>
                        )
                    })
                }
            </div>
        </div>

    )
}
