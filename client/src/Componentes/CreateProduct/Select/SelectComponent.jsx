import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { get_categories, get_sub } from '../../../redux/actions'
import "./SelectComponent.scss";
 
export default function SelectComponent( {select, handleChange}) {


      let dispatch = useDispatch()

      let {categories, sub} = useSelector(state => state.reducer)

      let subCat = select.sub
    
      useEffect(() => {

        if (select.category) {
          dispatch(get_sub(select.category.value))
          return
        }
        dispatch(get_categories())
      }, [select.category])

      let types = [
        { value: "tv", label: "TV" },
        { value: "audifonos", label: "Audifonos" },
        { value: "equipos", label: "Equipos de sonido" }
      ]
    return (
        <div className="containerSelect">
          <div className="select">
            <Select
                name='category'
                options={categories.map(c => {
                    return { value: c.name, label: c.name[0].toUpperCase() + c.name.substring(1) }
                })}
                isClearable={true}
                onChange={handleChange}
            />
          </div>
          <br/>
          <div className="select">
            <Select
                name='sub'
                options={sub.map(c => {
                    return { value: c.name, label: c.name[0].toUpperCase() + c.name.substring(1).replaceAll("_", " ") }
                })}
                isClearable={true}
                onChange={handleChange}
                value={select.sub}
            />
          </div>

            {
              subCat && subCat.value === "audio_y_video" && (
                <Select
                name='type'
                options={types}
                isClearable={true}
                onChange={handleChange}
                value={select.type}
            />
              )
            }
        </div>
    )
}
