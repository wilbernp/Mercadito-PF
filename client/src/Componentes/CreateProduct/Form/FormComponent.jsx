import React from 'react'
import { useSelector } from 'react-redux'

export default function FormComponent(handleInputChange, input) {

  let { features } = useSelector(state => state.reducer)
  return (
    <>
      {
        features.map(f => {
          if (f === "description") {
            return (
              <div>
                <div>
                  <label>Descripcion: </label>
                </div>
                <textarea onChange={handleInputChange} rows="4" cols="50"></textarea>
              </div>
            )
          }
          return (
            <div>
              <label>{f}</label>
              <input onChange={handleInputChange} type="text" name={f} />
            </div>

          )
        })
      }
    </>


    // <>
    // <div>
    //   <label>Nombre: </label>
    //   <input onChange={handleInputChange} type="text" name='name' value={input.name}/>
    // </div>
    // <div>
    //   <label>Precio: </label>
    //   <input type="text" />
    // </div>
    // <div>
    //   <label>Stock: </label>
    //   <input type="text" />
    // </div>

    // <div>
    //   <div>
    //   <label>Descripcion: </label>
    //   </div>
    //   <textarea rows="4" cols="50"></textarea>
    // </div>
    // </>
  )
}

