import React from 'react'
import clienteAxios from '../../config/axios';
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2'

import './FormBuy.scss'

export var ordenP
export default function FormBuy() {
    const history = useHistory();
    // const _id = _id
    let id_cart = localStorage.getItem("id_cart")
    const [errors , setErrors] = useState(true);
    let [form, setForm]=useState({})
    const [input,setInput]= useState({
        nombre:"",
        apellido:"",
        direccion:"",
        codigoPostal:"",
        ciudad:"",
        pais:"",
        telefono:""


    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    function validate(input){
        let regexheightWeight = /\d{1,2}/gi;
        let regexName = /[a-zA-Z0-9:-\s’']/;
        let regexDescription = /^.{1,300}$/;
        
        let errors = {};
        
        if(input.nombre.trim()){
            errors.nombre = "*"
        }else if(!regexName.test(input.nombre.trim())){
            errors.nombre = "El campo de nombre solo acepta letras, números y caracteres"
        }
        if(input.apellido.trim()){
            errors.apellido = "*"
        }else if(!regexName.test(input.apellido.trim())){
            errors.apellido = "El campo de apellido solo acepta letras, números y caracteres"
        }

        if(input.direccion.trim()){
            errors.direccion = "*"
        }else if(!regexName.test(input.direccion.trim())){
            errors.direccion ="El campo de direccion solo acepta letraS, numero y caracteres"
        }
        
        if(input.codigoPostal.trim()){
            errors.codigoPostal = "*"
        }
        
        if(input.ciudad.trim()){
            errors.ciudad = "*"
        }else if(!regexName.test(input.ciudad.trim())){
            errors.ciudad = "El campo de ciudad solo acepta letras, numeros y caracteres"
        }
        
        if(input.pais.trim()){
            errors.pais = "*"
        }else if(!regexName.test(input.pais.trim())){
            errors.pais="El campo de pais solo acepta letras, numeros y caracteres"
        }
        
        if(input.telefono.trim()){
            errors.telefono = "*"
        }
        return errors
    }
    
    const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    
      };

      const handleSubmit= async function(e){
        e.preventDefault(e);
        if( ! input.nombre ||
            ! input.apellido ||
            ! input.direccion ||
            ! input.codigoPostal ||
            ! input.ciudad ||
            ! input.pais ||
            ! input.telefono){
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parametros requeridos',
                    // footer: '<a href="">Why do I have this issue?</a>'
                  })
            }

            await clienteAxios.put(`/Orden/${id_cart}`,input)
                history.push("/orden")
            // console.log(input,"este es el input")
            setInput({
                nombre:"",
                apellido:"",
                direccion:"",
                codigoPostal:"",
                ciudad:"",
                pais:"",
                telefono:""
            })

      }

    return(
        <div className='formContainer'>
                <form  className='formulario' onSubmit={e=>handleSubmit(e)}>
                    <h3>Nombre:</h3>
                    <input 
                    type="text"
                    value={input.nombre}
                    name="nombre"
                    placeholder={errors.nombre}
                    onChange={e=>handleChange(e)}
                    />
                    <h3>Apellido:</h3>
                    <input 
                    type="text"
                    value={input.apellido}
                    placeholder={errors.apellido}
                    name="apellido"
                    onChange={e=>handleChange(e)}
                    />
                    <h3>Direccion:</h3>
                    <input
                    type="text"
                    value={input.direccion}
                    placeholder={errors.direccion}
                    name="direccion"
                    onChange={e=>handleChange(e)}
                    />
                    <h3>Codigo Postal:</h3>
                    <input 
                    type="number"
                    value={input.codigoPostal}
                    placeholder={errors.codigoPostal}
                    name="codigoPostal"
                    onChange={e=>handleChange(e)}
                    />
                    <h3>Ciudad:</h3>
                    <input
                    type="text"
                    value={input.ciudad}
                    placeholder={errors.ciudad}
                    name="ciudad"
                    onChange={e=>handleChange(e)}
                    />
                    <h3>Pais:</h3>
                    <input 
                    type="text"
                    value={input.pais}
                    placeholder={errors.pais}
                    name="pais"
                    onChange={e=>handleChange(e)}
                    />
                    <h3>Telefono:</h3>
                    <input
                    type="number"
                    input={input.telefono}
                    name="telefono"
                    placeholder={errors.telefono}
                    onChange={e=>handleChange(e)}
                    />
                    {/* <Link to="/Orden" > */}
                    {/* </Link> */}
                    <div className='buttonContainer'>
                        <button  type="submit">enviar</button>
                    </div>
                </form>
        </div>
    )
}