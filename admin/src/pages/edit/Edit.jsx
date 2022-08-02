import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormEdit from '../../components/formedit/FormEdit'

export default function Edit() {
    let {id} = useParams()
    let [product, setProduct]=useState({})
    let [labels, setLabels] = useState([])

    useEffect(()=>{
        (
            async function(){
                let res = await fetch(`http://localhost:3001/products/${id}`).then(res => res.json())
                console.log(res)
                setProduct(res)
                let arr = []
                for (const key in res) {
                    if ( key !== "_id" && key !== "id" && key !== "seller" && key!=="image" && !arr.includes(key)) {
                        arr.push(key)
                    }
                    setLabels(arr)
                }
            }
        )()
    },[])

    function handleChange(e){
        setProduct(prev=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };
        let update = await fetch(`http://localhost:3001/products/${product._id}`, requestOptions).then(res =>res.json())
           console.log(update)
           alert("producto actualizado")
    }
  return (
    <FormEdit handleSubmit={handleSubmit} product={product} labels={labels} handleChange={handleChange}/>
  )
}
