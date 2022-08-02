import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Cloudinary from "./cloudinary";
import { Link } from "react-router-dom";
import WidgetCloudinary from "../../components/WidgetCloudinary/WidgetCloudinary";

const New = ({ inputs, title }) => {
  const [url, setUrl] = useState("");
  let data = [
    "title",
    "category",
    "price",
    "description",
    "stock"
  ];
  let obj ={
    title:"",
    category:"",
    price:"",
    description:"",
    stock:""
  }
  let [input, setInput] = useState(obj)

  function handleChange(e){
    setInput(prev =>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault()

    try {

      await fetch('http://localhost:3001/products/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...input, image:url})
      });
      alert("creado con exito")
      setInput(obj)
      setUrl("")
      // await fetch("http://localhost:3001/products/")
    } catch (error) {
      alert("algo ha ocurrido")
      console.log(error)
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                url.length
                  ? url
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
             <WidgetCloudinary setUrl={setUrl}/>
          </div>
         
          <div className="right">
            <form onSubmit={handleSubmit}>

              {data.map((d, i) => (
                <div className="formInput" key={i}>
                  <label>{inputs[i].label}</label>
                  {
                    inputs[i].label === "Description" ? <textarea onChange={handleChange} value={input[d]} name={d} placeholder="Description" cols="35" rows="5"></textarea> :
                      <input value={input[d]} name={d} onChange={handleChange} type={inputs[i].type} placeholder={inputs[i].placeholder} />
                  }

                </div>
              ))}
              <button type="submit">Crear</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
