import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import clienteAxios from '../../../config/axios'
import { update_current_page, update_querys_filter, update_url } from '../../../redux/actions'

import './Category.scss'

export default function Electrodomesticos() {
    let [electrodomesticos, setElectrodomesticos] = useState([])

    let dispatch = useDispatch()
    useEffect(() => {
        // se obtienen las categorias de productos
        (async function () {
            let {data} = await clienteAxios.get('/categories')
            // console.log(res[0].tecnologia[0].name)
            setElectrodomesticos(data[0].sub)
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
                <h3>Electrodomesticos</h3>

                {
                    // el estado local [electrodomesticos] tiene en la posicion 1 un objeto asi:
                    // {electrodomesticos:[tipos de electrodomesticos]} 
                    electrodomesticos.length && electrodomesticos.map((c, i) => {
                        return (
                            <div key={i} onClick={(e) => handleClick(e, c.name)} className='sub-category'>
                                <Link to="/" className='link'>{c.name.replaceAll("_", " ")}</Link>
                            </div>
                        )
                    })
                }
            </div >
        </div>

    )
}
