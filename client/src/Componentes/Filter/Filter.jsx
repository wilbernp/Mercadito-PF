import React from 'react'
import Electrodomesticos from './Category/Electrodomesticos'
import Moda from './Category/Moda'
import Muebles_y_Hogar from './Category/Muebles_y_Hogar'
import Tecnology from './Category/Tecnology'
import './Filter.scss'
// import Category1 from './Category/Category1'
// import Category2 from './Category/Category2'

export default function Filter() {


  return (
    <div className='categorias'>
    
      <div className='categoria-sub'>
      <Tecnology/>
      </div>
      <br/>
      <div className='categoria-sub'>
        <Electrodomesticos/>
      </div>
      <br/>
      {/* <div className='categoria-sub'>
      <Muebles_y_Hogar/>
      </div> */}
      <div className='categoria-sub'>
        <Moda/>
      </div>
    
    </div>
    
  )
}
