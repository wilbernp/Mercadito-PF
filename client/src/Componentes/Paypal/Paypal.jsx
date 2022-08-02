import { useEffect, useRef } from 'react'
import clienteAxios from '../../config/axios';

export default function Paypal() {
    const paypal = useRef();
let id_cart = localStorage.getItem("id_cart")
    useEffect(() => {
      window.paypal.Buttons({
            createOrder: async function () {

              try {
                let {data} = await clienteAxios.post(`/paypal/create-payment/${id_cart}`)
                return data.id
              } catch (error) {
                console.log(error)
              }
              

              
              // return clienteAxios.post(`/paypal/create-payment/${id_cart}`)
              //   .then(res => {
              //     if (res.ok) return res.json()
              //     return res.json().then(json => Promise.reject(json))
              //   })
              //   .then(({ id }) => {
              //     return id
              //   })
              //   .catch(e => {
              //     console.error(e.error)
              //   })
            },
            onApprove: function (data, actions) {
              return actions.order.capture()
            },
          })
        .render(paypal.current);
    }, []);
  
    return (
      <div>
        <div ref={paypal}></div>
      </div>
    );
}
