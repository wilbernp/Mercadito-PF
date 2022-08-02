import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import clienteAxios from '../../../config/axios'
import { update_querys_filter, update_url } from '../../../redux/actions'

import './Category.scss'

export default function Tecnology() {

    // let {url} = useSelector(state => state)
    let [tecnologia, setTecnology] = useState([])

    let dispatch = useDispatch()
    useEffect(() => {
        // se obtienen las categorias de productos
        (async function () {
            let {data} = await clienteAxios.get('/categories')
            setTecnology(data[1].sub)
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
                <h3 >Tecnología</h3>
                {
                    // el estado local [tecnology] tiene en la posicion 0 un objeto asi:
                    // {tecnologia:[tipos de tecnologia]} 
                    tecnologia.length && tecnologia.map((c, i) => {
                        return (
                            <div  key={i} onClick={(e) => handleClick(e, c.name)} className='sub-category'>
                                <Link to="/" className='link'>{c.name.replaceAll("_", " ")}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}
