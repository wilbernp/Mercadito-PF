import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Button from '@mui/material/Button';
import clienteAxios from '../../config/axios';
import TokenAuth from "../../config/tokenAuth"
import { useHistory } from 'react-router-dom';

// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: theme.spacing(2),

//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '300px',
//         },
//         '& .MuiButtonBase-root': {
//             margin: theme.spacing(2),
//         },
//     },
// }));

const FormEditPerfil = () => {
    // const classes = useStyles();
    // create state variables for each input

    let [input, setInput] = useState({
        name:"",
        lastname:"",
        email:"",
        password:""
    })

    let history = useHistory()

    const token = localStorage.getItem("token");
    useEffect(() => {
        (
            async function () {
                const { data } = await clienteAxios.get(`/users`, TokenAuth(token));
                let {name, lastname, email} = data
                setInput({name, lastname, email})
            }
        )()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
        const { data } = await clienteAxios.put(`/users/update-perfil`,input, TokenAuth(token));

        alert("datos actualizados")
        history.push("/")

    }

    function handleClose() {
        history.push("/")
    }

    function handleChange(e){
        setInput(prev =>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }


    return (
        <form className={"root"} onSubmit={handleSubmit}>
            <TextField
            name="name"
                label="First Name"
                variant="filled"
                required
                value={input.name}
                onChange={handleChange}
            />
            <TextField
            name="lastName"
                label="Last Name"
                variant="filled"
                required
                value={input.lastname}
                onChange={handleChange}
            />
            <TextField
            name="email"
                label="Email"
                variant="filled"
                type="email"
                required
                value={input.email}
                onChange={handleChange}
            />
            <TextField
            name="password"
                label="Password"
                variant="filled"
                type="password"
                required
                value={input.password}
                onChange={handleChange}
            />
            <div>
                <Button variant="contained" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Actualizar
                </Button>
            </div>
        </form>
    );
};

export default FormEditPerfil;
// import React from 'react'

// export default function FormEditPerfil() {
//   return (
//     <div>FormEditPerfil</div>
//   )
// }
