import * as React from 'react';
import { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import clienteAxios from '../../config/axios';
// import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}


const rows = [
  createData(
  
    // 0,
    // '16 Mar, 2019',
    // 'Elvis Presley',
    // 'Tupelo, MS',
    // 'VISA ⠀•••• 3719',
    // 312.44,
    ),
    ];
    
    function preventDefault(event) {
      event.preventDefault();
    }
    
    export default function Miscompras() {
      let id_cart = localStorage.getItem("id_cart")

      const[ordernP, setOrdenP] = useState({})

      useEffect(()=>{
        (
          async function(){
            const {data} = await clienteAxios.get(`/shoping/${id_cart}`)
            setOrdenP(data,"oo")
            console.log(data)
          }
          )()
        },[])
        return (
          <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>orden</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Productos</TableCell>
            <TableCell >Pago</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {ordernP.user && ordernP.user.map((row) => (
            <TableRow >
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.apellido}</TableCell> */}
              {/* <TableCell>{row.paymentMethod}</TableCell> */}
              {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            {/* </TableRow>
          ))}
        </TableBody> */}
        <TableBody>
          {ordernP.user &&
            <TableRow >
              <TableCell>{ordernP.user.nombre}</TableCell>
              <TableCell>{ordernP.user.apellido}</TableCell>
              <TableCell><Link href="/Orden">orden</Link></TableCell>
              <TableCell >{ordernP.calc.totalPrice}</TableCell>
              <TableCell >{ordernP.calc.totalProducts}</TableCell>
            </TableRow>
        }
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}