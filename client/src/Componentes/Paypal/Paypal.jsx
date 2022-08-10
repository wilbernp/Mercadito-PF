import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios';

export default function Paypal() {
  let history = useHistory()
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
            onApprove: async (data, actions) => {
              try {
                let orderData = await actions.order.capture()
                console.log(orderData)
                Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Pago exitoso',
                      showConfirmButton: false,
                      timer: 2000
                    })
                history.push("/")
                localStorage.removeItem("id_cart")

              } catch (error) {
                
              }
              

              

              // return actions.order.capture().then(function(orderData) {
              //   // Successful capture! For dev/demo purposes:
              //   console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
              //   const transaction = orderData.purchase_units[0].payments.captures[0];
              //   Swal.fire({
              //     position: 'top-end',
              //     icon: 'success',
              //     title: 'Pago exitoso',
              //     showConfirmButton: false,
              //     timer: 2000
              //   })

              //   history.push("/")

              //   // When ready to go live, remove the alert and show a success message within this page. For example:
              //   // const element = document.getElementById('paypal-button-container');
              //   // element.innerHTML = '<h3>Thank you for your payment!</h3>';
              //   // Or go to another URL:  actions.redirect('thank_you.html');
              // });
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