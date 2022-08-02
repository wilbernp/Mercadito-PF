// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { update_querys_filter, update_url } from '../../../redux/actions'

// export default function Muebles_y_Hogar() {
//     let [mh, setMh] = useState([])

//     let dispatch = useDispatch()
//     useEffect(() => {
//         // se obtienen las categorias de productos
//         (async function () {
//             let res = await fetch('http://localhost:3001/categories').then(res => res.json())
//             setMh(res)
//         })()
//     }, [])

//      //  modifica el estado global [url] para que home haga una nueva peticion a la url del estado
//     // global
//     function handleClick(e, c) {
//         e.preventDefault()
//         dispatch(update_querys_filter(`category=muebles_y_hogar: ${c}`))
//         dispatch(update_url())
//     }

//     return (
//         <div>
//             <a href="!#">muebles y hogar</a>
//             <ul>

//                 {
//                     // el estado local [mh] tiene en la posicion 2 un objeto asi:
//                     // {muebles_y_hogar:[tipos de muubles]} 
//                     mh.length && mh[2].muebles_y_hogar.map((c, i) => {
//                         return (
//                             <li key={i}>
//                                 <a onClick={(e) => handleClick(e, c.name)} href="!#">{c.name.replaceAll("_", " ")}</a>
//                             </li>
//                         )
//                     })
//                 }
//             </ul>
//         </div>

//     )
// }
