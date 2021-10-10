//const express= require('express');
import Express from 'express';
import { MongoClient } from 'mongodb';

const stringConexion='mongodb+srv://Valen:gestorventas@proyectogestordeventas.14chn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client= new MongoClient(stringConexion,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
let conexion;
const app=Express()
app.use(Express.json())

app.get('/menu/productos',(req,res)=>{
    console.log('alguien hizo get en /productos');
    conexion
    .collection('producto')
    .find({})
    .limit(50)
    .toArray((err,result)=>{
        if(err){
            res.Status(500).send('Error consultando los productos');
        }
        else{
            res.json(result);
        }

    });
});

app.post('/menu/productos/nuevo',(req,res)=>{
    //implementar código para crear productos en la BD
    console.log(req);
    const datosproducto=req.body;
    console.log('llaves: ', Object.keys(datosproducto));
    try{
        if (
            Object.keys(datosproducto).includes('name')&& 
            Object.keys(datosproducto).includes('brand')&&
            Object.keys(datosproducto).includes('id')&&
            Object.keys(datosproducto).includes('price')
        ){ 
            //implementar código para crear productos en la BD
            conexion.collection('producto').insertOne(datosproducto,(err,result)=>{
                if(err){
                    console.error(err);
                    res.sendStatus(500);
                }
                else{
                    res.sendStatus(200);

                }

            });
        }else{
            console.log(result);
            res.sendStatus(500);
        }    
    }catch{
        res.sendStatus(500);
    }
});



const main= ()=>{
    client.connect((err,db)=>{
        if (err){
            console.error('Error conectando a la base de datos');
            return false;
        }
        conexion=db.db('productos');
        console.log('conexion exitosa');
        return app.listen(5000,()=>{
            console.log('escuchando puerto 5000');
        });
    });
    
};
main();

