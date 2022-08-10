require("dotenv").config()
// const request=require("request")
let {shopingCarModel}=require("../schemas/shopingCar.schema")
const {calc}=require("../funciones/Calc")
let {CLIENT_PAYPAL, SECRET_PAYPAL}= process.env

const paypal = require("@paypal/checkout-server-sdk")
const Environment = paypal.core.SandboxEnvironment
  // process.env.NODE_ENV === "production"
  //   ? paypal.core.LiveEnvironment
    // : paypal.core.SandboxEnvironment
    
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    CLIENT_PAYPAL,
   SECRET_PAYPAL
  )
)


// const auth = { user: CLIENT_PAYPAL, pass: SECRET_PAYPAL }


exports.createPayment = async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest()
    let shoping = await shopingCarModel.findById(req.params.id)
    let response = calc(shoping.products)

    request.prefer("return=representation")
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: response.totalPrice
            // breakdown: {
            //   item_total: {
            //     currency_code: "USD",
            //     value: 15,
            //   },
            // },
          }
        //   items: req.body.items.map(item => {
        //     const storeItem = storeItems.get(item.id)
        //     return {
        //       name: storeItem.name,
        //       unit_amount: {
        //         currency_code: "USD",
        //         value: storeItem.price,
        //       },
        //       quantity: item.quantity,
        //     }
        //   }),
        },
      ],
    })
  
    try {
      const order = await paypalClient.execute(request)
      res.json({ id: order.result.id })
    } catch (e) {
        console.log(e)
      res.status(500).json({ error: e.message })
    }
  }
// exports.createPayment = async (req, res) => {
//     let shoping = await shopingCarModel.findById(req.params.id)
//     let response = calc(shoping.products)
    
//     const body = {
//         intent: 'CAPTURE',
//         purchase_units: [{
//             amount: {
//                 currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
//                 value: response.totalPrice
//             }
//         }],
//         application_context: {
//             brand_name: `Mercadito`,
//             landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
//             user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
//             return_url: `http://localhost:3001/paypal/execute-payment`, // Url despues de realizar el pago
//             cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago
//         }
//     }
//     //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

//     request.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, {
//         auth,
//         body,
//         json: true
//     }, (err, response) => {
//         res.json({ data: response.body })
//     })
//     // res.send("post a paypal")
// }

// exports.executePayment = (req, res) => {
//     const token = req.query.token; //<-----------

//     request.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
//         auth,
//         body: {},
//         json: true
//     }, (err, response) => {
//         res.json({ data: response.body })
//     })
// }