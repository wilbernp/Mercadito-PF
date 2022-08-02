// import { useEffect, useState } from "react"

import {useState} from "react";
import { useSelector } from "react-redux"
import s from "./paginate.module.css"

export default function Paginate(props) {
    // const {
    //     data,
    //     dataPerPage,
    //     changePage,
    //     max
    // } = props

    const {
        totalPages,
        minLimit,
        maxLimit,
        handleClick,
        
    } = props

    console.log(totalPages)

    let {currentPage}= useSelector(state => state.reducer)
    
    const pages = []

    for (let i = 1; i < totalPages; i++) {
        pages.push(i)
    }


    function pagesButton(page) {
        return (
            <li
                className={s.li}
                key={page}>
                <button
                    className={currentPage === page? `${s.btn} ${s.active}`: s.btn}
                    onClick={() => handleClick(page)}>{page}</button>
            </li>)
    }

    return (

        <ul>
            <li className={s.li}>
                <button

                    className={currentPage ===1? `${s.btn} ${s.disable}`: s.btn}
                    disabled={currentPage === 1}
                    onClick={() => handleClick(currentPage - 1)}
                >Prev</button>

            </li>

            <li className={s.li}>
                <button 
                className={currentPage === 1? `${s.btn} ${s.active}`: s.btn}
                    onClick={() => handleClick(1)}>1</button>
            </li>
            {
                currentPage > 4 && totalPages > maxLimit && <button
                    className={s.btn}
                    onClick={() => handleClick(currentPage - 2)}>...</button>
            }



            {pages.map((page) => {
                if (totalPages < maxLimit && page > 1) {
                    return pagesButton(page)
                } else if (totalPages >= maxLimit) {
                    if (page <= maxLimit && page > minLimit) {
                        return pagesButton(page)
                    }
                }

            })}

            {
                currentPage < (totalPages - 3) && totalPages > maxLimit && <button
                    className={s.btn}
                    onClick={() => handleClick(currentPage + 2)}>...</button>
            }
            {totalPages > 1 && <li className={s.li}>
                <button
                    className={currentPage === totalPages? `${s.btn} ${s.active}`: s.btn}
                    onClick={() => handleClick(totalPages)}>{totalPages}</button>
            </li>}


            <li className={s.li}>
                <button
                 className={currentPage === totalPages || totalPages === 0? `${s.btn} ${s.disable}`: s.btn}
                    disabled={currentPage === totalPages|| totalPages === 0}
                    onClick={() => handleClick(currentPage + 1)}>
                    Next</button>
            </li>
        </ul>

    )
}


