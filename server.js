//Importación de express tradicional
//const express = require('express');

//hacer el nuevo import
import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import {connectServer} from './db/db.js'
import rutasVentas from "./views/ventas/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasProducto from './views/productos/rutas.js'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

dotenv.config({path:'./.env'});

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://proyecto-ventas.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-gestor-ventas',
  issuer: 'https://proyecto-ventas.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(rutasVentas);
app.use(rutasUsuario);
app.use(rutasProducto);

const main = () => {
    return app.listen(port, () => {
        console.log(`Escuchando puerto ${port}`);
    });
};

connectServer(main);

