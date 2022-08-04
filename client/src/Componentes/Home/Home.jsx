import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products, update_current_page, update_querys_filter, update_querys_paginate, update_url } from "../../redux/actions";
import Paginate from "../pagination/Paginate";
import Slider from "../Slider/Slider";
import Footer from "../Footer/Footer";
// import s from './home.module.css'
import Cards from "../Card/Card";
import { Link } from "react-router-dom";
import './Home.scss'


export default function Home() {

    let [viewAllProducts, setViewAllProducts] = useState(false)
    let [fetchData, setFetchData] = useState({})
    // let [productsAll, setProductsAll] = useState([])
    let [minLimit, setMinLimit] = useState(1)
    let [maxLimit, setMaxLimit] = useState(6)
    const [productsPerpage, setproductsPerpage] = useState(8)

    let { data, products } = fetchData

    let dispatch = useDispatch()

    // traigo el estado global
    let { url, currentPage } = useSelector(state => state.reducer)

    // se hara una peticion a la api cada vez que se monte el componente o se actualice el estado
    // global [url]
    useEffect(() => {
        document.body.scrollIntoView();
        // autoinvoke function que hace una petcion a la api y la guarda en el estado  local
        (async function () {
            if (url.length) {
                let res = await fetch(url).then(res => res.json())
                // console.log(url)
                setFetchData(res)
                return
            }
            let res = await fetch(`${process.env.REACT_APP_API_URL}/products?page=${0}&limit=${productsPerpage}`).then(res => res.json())


            setFetchData(res)
            // console.log(products)
        })()

    }, [url, productsPerpage])





    // controla los datos que los datos que se renderizan en cada pagina
    function handleClick(page) {
        dispatch(update_querys_paginate(`page=${page - 1}&limit=${16}`))
        dispatch(update_url())
        if (data.totalPages > maxLimit) {
            if (page > 0 && page < 4) {
                setMinLimit(1)
                setMaxLimit(6)
                dispatch(update_current_page(page))
                return
            }
            if (page <= data.totalPages && page > (data.totalPages - 4)) {
                setMinLimit(data.totalPages - 6)
                setMaxLimit(data.totalPages - 1)
                dispatch(update_current_page(page))
                return
            }
        }


        if (page > currentPage) {
            if ((page - minLimit) === 4) {
                setMinLimit(minLimit + 1)
                setMaxLimit(maxLimit + 1)
            } else if (page - minLimit === 5) {
                setMinLimit(minLimit + 2)
                setMaxLimit(maxLimit + 2)
            }
        } else if (page < currentPage) {
            if ((page - minLimit) === 2) {
                setMinLimit(minLimit - 1)
                setMaxLimit(maxLimit - 1)
            } else if ((page - minLimit) === 1) {
                setMinLimit(minLimit - 2)
                setMaxLimit(maxLimit - 2)
            }
        }

        dispatch(update_current_page(page))

    }

    // hace que se mustren todos los productos en divididos en paginas de 16 productos
    function viewAll(e) {
        e.preventDefault()
        setViewAllProducts(true)
        dispatch(update_current_page(1))
        dispatch(get_all_products())
        setproductsPerpage(16)
    }

    return (
        <div>
            {!url.includes("category")&&<Slider />}

            <div className='cardGrid'>
                {/*  se mapea lo que tenga el estado local y se crea una card por cada producto 
                en el estado local  */}
                {products && products.map((product) => {
                    return (
                        <Cards 


                        // key={p.id} 
                        // id={p.id} 
                        // image={p.image} 
                        // name={p.name} 
                        // seller={p.seller} 
                        // price={p.price}
                        // _id={p._id}

                        {...product}
                        />
                    )
                })
                }

            </div>

            {/* esto lo comente// maxi */}
            {/* {
                // se mapea lo que tenga el estado local y se crea una card por cada producto 
                // en el estado local

                products && products.map((p) => {
                    return( 
                        // <Link to={`/detail/${p.id}`}>
                         <Cards image={p.image} name={p.name} seller={p.seller} sales={p.sales} price={p.price} id={p.id} />
                        // </Link>)
                    )
                       
                    // console.log(k)  

                })
            } */}

            {
                // opcion para ver todos los productos
                !url.length && (
                    <div onClick={viewAll} className='verProducts'>
                        <Link to="/">
                            <button>Ver todos los productos</button>
                        </Link>
                    </div>

                )
            }

            {viewAllProducts || currentPage > 0 ?
                <div className='paginateContent'>
                    <Paginate
                        totalPages={data && data.totalPages}
                        minLimit={minLimit}
                        maxLimit={maxLimit}
                        handleClick={handleClick}
                    />
                </div> : null}
            <Footer />
        </div>
    )
}


// const Home: React.FC = () => {

//   let dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(get_all_products())
//   }, [])


//   return (
//     <div>
//       {
//         state.map()
//       }
//     </div>
//   );
// };


// export default Home