//Importación de express tradicional
//const express = require('express');

//hacer el nuevo import
import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import {connectServer} from './db/db.js'
import rutasVentas from "./views/ventas/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";

dotenv.config({path:'./.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVentas);
app.use(rutasUsuario);

const main = ()=>{
    return app.listen(process.env.PORT,()=>{
        console.log(`Escuchando puerto${process.env.PORT}`);
    });
};

connectServer(main);