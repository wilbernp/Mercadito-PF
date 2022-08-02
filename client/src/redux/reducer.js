import { GET_ALL_PRODUCTS, GET_CATEGORIES, GET_FEATURES, GET_SUB, UPDATE_CURRENT_PAGE, UPDATE_QUERYS_FILTER, UPDATE_QUERYS_ORDER, UPDATE_QUERYS_PAGINATE, UPDATE_URL } from "./actionsTypes";

let initState={
    url: "",
    currentPage:0,
    querys:['page=${0}&limit=${16}'],
    categories:[],
    sub:[],
    features:[],
    path:"/"
}

function reducer(state = initState, action){
    switch (action.type) {
        // se modifica el estado global [url] para que los componentes suscritos a dicho estado 
        // realicen una peticion a la api
        case UPDATE_QUERYS_PAGINATE:
            return{
                ...state,
                querys: state.querys.map((q, i) => {
                    if(i === 0){
                        return action.payload
                    } else{
                        return q
                    }
                }),
                // url:`http://localhost:3001/products?${state.querys.join("&")}`
            }
            
        case UPDATE_QUERYS_FILTER:
            return{
                ...state,
                querys: [`page=${0}&limit=${16}`, action.payload],
                currentPage:1
            }

        case UPDATE_QUERYS_ORDER:
            let querysMap =  state.querys.filter((query) => !query.includes("sort")&&!query.includes("page"))
            return{
                ...state,
                querys: [`page=${0}&limit=${16}`,...querysMap, action.payload],
                currentPage:1
            }
        case UPDATE_URL:
            return{
                ...state,
                url:`http://localhost:3001/products?${state.querys.join("&")}`
            }

        case UPDATE_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
        case GET_ALL_PRODUCTS:
            return{
                ...state,
                url: `http://localhost:3001/products?page=${0}&limit=${16}`
            }
        case GET_CATEGORIES:
            return{
                ...state,
                categories:action.payload
            }

        case GET_SUB:
            return{
                ...state,
                sub:action.payload
            }
        case GET_FEATURES:
            return{
                ...state,
                features:action.payload
            }
        
        default:
            return state;
    }
}

export default reducer