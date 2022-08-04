import { GET_ALL_PRODUCTS, GET_CATEGORIES, GET_FEATURES, GET_SUB, UPDATE_CURRENT_PAGE, UPDATE_QUERYS_FILTER, UPDATE_QUERYS_ORDER, UPDATE_QUERYS_PAGINATE, UPDATE_URL } from "./actionsTypes"


function update_querys_filter(query) {
    return{
        type: UPDATE_QUERYS_FILTER,
        payload: query
    }
}
function update_querys_order(query) {
    return{
        type: UPDATE_QUERYS_ORDER,
        payload: query
    }
}

function update_querys_paginate(query) {
    return{
        type: UPDATE_QUERYS_PAGINATE,
        payload: query
    }
}

function update_url(){
    return{
        type:UPDATE_URL
    }
}

function update_current_page(page){
    return{
        type:UPDATE_CURRENT_PAGE,
        payload:page

    }
}
function get_all_products(){
    return{
        type:GET_ALL_PRODUCTS
    }
}

const URL = `${process.env.REACT_APP_API_URL}/categories`
function get_categories(){
    return(dispatch)=>{
        return fetch(URL)
        .then(res => res.json())
        .then(json =>{
            return dispatch({
                type: GET_CATEGORIES,
                payload:json
            })
        })
    }
}

function get_sub(value){
    return(dispatch)=>{
        return fetch(`${URL}?name=${value}`)
        .then(res => res.json())
        .then(json =>{
            return dispatch({
                type: GET_SUB,
                payload:json.sub
            })
        })
    }
}

let arr = [
    "name",
    "price",
    "stock",
    "description",
    "image",
    "almacenamiento",
    "ram",
    "marca",
    "modelo",
    "bateria",
    "frecuencia",
    "resolucion",
    "duracion_bateria",
    "potencia",
    "litros",
    "RPM",
    "capacidad_de_lavado",
    "tipo"
    // "procesador"
]

function get_features(query){
    return(dispatch)=>{
        return fetch(`${process.env.REACT_APP_API_URL}/features?${query}`)
        .then(res => res.json())
        .then(json =>{
            console.log(json)
            let features=[]
            for (const key in json) {
                if (arr.includes(key)) {
                    features.push(key)
                }
            }
            return dispatch({
                type: GET_FEATURES,
                payload:features
            })
        })
    }
}





// exporto todas las funciones
export {
    update_url,
    update_querys_filter,
    update_querys_order,
    update_querys_paginate,
    update_current_page,
    get_all_products,
    get_categories,
    get_sub,
    get_features
}