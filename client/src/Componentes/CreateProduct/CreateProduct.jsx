import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_features } from '../../redux/actions'
import FormComponent from './Form/FormComponent'
import SelectComponent from './Select/SelectComponent'
import "./Create.scss";
import clienteAxios from '../../config/axios'

export default function CreateProduct() {
  let [input, setInput] = useState({})
  let [select, setSelect] = useState({
    category: null,
    sub: null,
    type: null
  })
  let { features } = useSelector(state => state.reducer)
  let [show, setShow] = useState(true)
  let [disable, setDisable] = useState(true)
  let [error, setError]=useState({})
  let dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault()
    setShow(false)
    setDisable(true)
    if (select.type) {
      dispatch(get_features(`type=${select.type.value}`))
      return
    }
    dispatch(get_features(`category=${select.sub.value}`))

  }
  function handleChange(value, e) {

    if (e.name === "category") {
      setSelect(prev => {
        return {
          ...prev,
          category: value,
          sub: null,
          type: null
        }
      })

      // setDisable()
      return
    }

    if (e.name === "sub" && value.value !== "audio_y_video") {
      setSelect(prev => {
        return {
          ...prev,
          sub: value,
          type: null
        }
      })
      return
    }
    setSelect(prev => {
      return {
        ...prev,
        [e.name]: value
      }
    })


  }

  function handleInputChange(e) {
    e.preventDefault()

      setError(prev =>{
        return{
          ...prev,
          [e.target.name]:e.target.value===""
        }
      })

      for (const key in error) {
        setDisable(error[key])
      }
    
    console.log(e.target.name)
    setInput(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  async function handleSubmit(e) {
    e.preventDefault()
    let obj = { category: select.sub.value }
    if (select.type) {
      obj.type = select.type.value
    }

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
      body: JSON.stringify({ ...input, ...obj }),
      
    };

    await clienteAxios.post(`/products`,{ ...input, ...obj })
    // fetch('http://localhost:3001/products', requestOptions)
    //   .then(res => {
    //     if (res.status === 201) {
    //       alert(`created successfully`)

    //       // setInput({})

    //     }
    //   })
      // .catch((error) => {
      //   alert("oops! something has failed")
      // })
  }

  useEffect(() => {
    if (select.category && select.sub && select.sub.value !== "audio_y_video") {
      setDisable(false)
    } else if (select.sub && select.sub.value === "audio_y_video" && select.type) {
      // dispatch()
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [select])

  useEffect(()=>{
    let obj = {}
    let err = {}
    features.forEach(feature =>{
      obj[feature]=""
      err[feature]=true
    })
    setInput(obj)
    setError(err)
  },[features])

  useEffect(()=>{
    // setToken()
    console.log()
  },[])

  return (
    <div className="c">
    <div className="general-contain">
      <div className="GoHome">
      <Link to="/"><button >Go To Home</button></Link>
      </div>
      <div className=""></div>
      <form className="sele"onSubmit={handleSubmit}>
        {
          show && <>
            <h3>Seleccione la categoria de su producto:</h3>
            <SelectComponent className="sele" select={select} handleChange={handleChange} />
            <div className="Next">
            <button className="sele2"onClick={handleClick} disabled={disable}>Next</button>
            </div>
          </>
        }
        {
          !show && <>
            {
              features.map(f => {
                if (f === "description") {
                  return (
                    <div>
                      <div>
                        <label>Descripcion: </label>
                      </div>
                      <div className="f-input">
                      <textarea className="f-input" name={f} onChange={handleInputChange} rows="4" cols="50"></textarea>
                      </div>
                    </div>
                  )
                }
                return (
                  <div className="general">
                    <div clasName="f">
                    <label>{f[0].toUpperCase()+f.substring(1).replaceAll("_", " ")}</label>
                    </div>
                    <div className="f-input">
                    <input onChange={handleInputChange} type="text" name={f} />
                    </div>
                  </div>

                )
              })

            }
            <input disabled={disable} type="submit" />
          </>
        }
      </form>
    </div>
    </div>
  )
}

