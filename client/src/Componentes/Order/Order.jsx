import React from 'react'
import Alphabet from './category/Alphabet'
import PointsSeller from './category/PointsSeller'
import Price from './category/Price'

import './Order.scss'

// se renderizan todos los ordenamientos
export default function Order() {
  return (
    <div className='ordenes'>
        <div className='sub-ordenes'>
            <Alphabet/>
        </div>
        <div className='sub-ordenes'>
            <Price/>
        </div>
        {/* <div>
            <PointsSeller/>
        </div> */}
    </div>
  )
}
