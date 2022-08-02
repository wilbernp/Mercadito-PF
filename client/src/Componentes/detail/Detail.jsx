import React from 'react';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import {get_id} from '../../redux/actions';
import Footer from "../Footer/Footer.jsx";
import './Detail.scss'

export default function Detail () {
    const dispatch = useDispatch();
    // const Detail = useSelector((state)=>state.Detail);
    const {id} = useParams();
    let [detail, setDetail] = useState({})

    useEffect(()=>{
        (
            async function(){
                let {data} = await clienteAxios.get(`/products/${id}`)
                console.log(data)
                setDetail(data)
            }
        )()
    })
  return (
    <div className='containerDetails'>
        {
        <div >
            <div className='itemContainer'>
                <div className='imgContainer'>
                    <img src={detail.image}/>
                </div>
                <div className='caracteristicas'>
                    <h1 className='title'>{detail.name}</h1>
                    <h1 className='price'>{"$ "+detail.price}.00</h1>
                    <p className='description'> {detail.description}</p>
                    <h3><a>Categoria:</a> {detail.category}</h3>
                    <h3><a>En stock:</a> {detail.stock} unidades</h3>
                    {/* <h3><a>Productos vendidos:</a> {detail.sales}</h3> */}
                </div>
            </div>


            <div className='detallesContainer'>

                <div className='detalles'>
                    <h1>Detalles del producto: </h1>
                    {
                        detail.category === "celulares" || detail.category === "laptops_y_computadores" || detail.category === "consolas_de_videojuegos"?(
                            <div className='detalles'>
                                <h3><a>Almacenamiento: </a>{detail.almacenamiento}</h3>
                                <h3><a>Ram:</a> {detail.ram}</h3>
                                <h3><a>Marca:</a> {detail.marca}</h3>
                                <h3><a>Modelo:</a> {detail.modelo}</h3>
                                {
                                    detail.category === "celulares"?(
                                        <div className='detalles'>
                                            <h3><a>Bateria:</a>{detail.bateria}</h3>
                                        </div>
                                    ):(null)
                                }
                                <h3><a>Procesador:</a></h3>
                                <div>
                                <ul>
                                    <li>{detail.procesador.marca}</li>
                                    <li>{detail.procesador.linea}</li>
                                    <li>{detail.procesador.nucleos}</li>
                                    <li>{detail.procesador.velocidad}</li>
                                </ul>
                                </div>
                            </div>
                        ):(null)
                    }
                    </div>
                    <div>
                    {
                        detail.category === "audio_y_video"?(
                            detail.type === "tv"?(
                                <div className='detalles'>
                                    <h3><a>Marca:</a> {detail.marca}</h3>
                                    <h3><a>Modelo:</a> {detail.modelo}</h3>
                                    <h3><a>Frecuencia:</a> {detail.frecuencia}</h3>
                                    <h3><a>Resolucion:</a> {detail.resolucion}</h3>
                                </div>
                            ): detail.type === "audifonos"?(
                                <div className='detalles'>
                                    <h3><a>Marca:</a> {detail.marca}</h3>
                                    <h3><a>Modelo:</a> {detail.modelo}</h3>
                                    <h3><a>Duracion bateria:</a> {detail.duracion_bateria}</h3>
                                </div>
                            ): detail.type === "equipos"?(
                                <div className='detalles'>
                                    <h3><a>Marca:</a> {detail.marca}</h3>
                                    <h3><a>Modelo:</a> {detail.modelo}</h3>
                                    <h3><a>Potencia:</a> {detail.potencia}</h3>
                                </div>
                            ):(null)
                        ):(null)
                    }
                    </div>
                    <div>
                        {
                            detail.category === "refrigeracion"?(
                                <div className='detalles'>
                                    <h3><a>Marca:</a> {detail.marca}</h3>
                                    <h3><a>Modelo:</a> {detail.modelo}</h3>
                                    <h3><a>Litros:</a> {detail.litros}</h3>
                                </div>
                            ): detail.category === "lavado"?(
                                <div className='detalles'>
                                    <h3><a>Marca:</a> {detail.marca}</h3>
                                    <h3><a>Modelo:</a> {detail.modelo}</h3>
                                    <h3><a>RPM:</a> {detail.RPM}</h3>
                                    <h3><a>Capacidad de lavado:</a> {detail.capacidad_de_lavado}</h3>
                                    <h3><a>Potencia:</a> {detail.potencia}</h3>
                                </div>
                            ):detail.category === "cocina"?(
                                <div className='detalles'>
                                    <h3><a>Marca:</a> {detail.marca}</h3>
                                    <h3><a>Modelo:</a> {detail.modelo}</h3>
                                    <h3><a>Tipo:</a> {detail.tipo}</h3>
                                </div>
                            ):detail.category === "limpieza"?(
                                <div className='detalles'>
                                    <h3><a>Marca:</a> {detail.marca}</h3>
                                    <h3><a>Modelo:</a> {detail.modelo}</h3>
                                </div>
                            ):(<div/>
                            
                            )
                        }
                    </div>
            </div>          
        </div>
        }
        <div className='footer'>
            <Footer />
        </div>
    </div>    
  )
}



//lo que esta abajo es el que va y el de arriba es para presentaer el lunes 17/7 porque no llegamos a tenrminar los estilos

// import React, { useState } from 'react'
// import { useEffect } from 'react'

// import {useParams} from 'react-router-dom'

// export default function Detail() {

//     let [detail, setDetail]=useState({})
//     let [props, setProps]= useState([])
//     let {id} = useParams()

//     let arr = [
//         "name",
//         "price",
//         "stock",
//         "description",
//         "almacenamiento",
//         "ram",
//         "marca",
//         "modelo",
//         "bateria",
//         "frecuencia",
//         "resolucion",
//         "duracion_bateria",
//         "potencia",
//         "litros",
//         "RPM",
//         "capacidad_de_lavado",
//         "tipo",
//         "procesador"
//     ]

//     useEffect(()=>{
//         (
//             async function(){
//                 let res = await fetch(`http://localhost:3001/products/${id}`).then(res => res.json())

//                 for (const key in res) {
//                     if (arr.includes(key)) {
//                         setProps(prev =>{
//                             return [...prev, key]
//                         })
//                     }
                    
//                 }
//                 setDetail(res)
//             }
//         )()
//     },[])


//     return(
//         <>
//         <img src={detail.image} alt="" />
//         {
//             props.map(p =>{
                
//                 if (p ==="procesador") {
//                     let {marca, linea, nucleos, velocidad} = detail.procesador
//                     return(
//                         <>
//                         <h3>{p}: {marca} {linea} con {nucleos} nucleos a {velocidad}</h3>
//                         </>
                        
//                     )
//                 }
//                 if (p === "ram") {
//                     return(
//                         <h3>RAM: {detail.ram}GB</h3>
//                     )
//                 }
                
//                 return(
//                     <h3>{p}: {detail[p]}</h3>
//                 )
//             })
//         }
//         </>
//     )
   
// }
