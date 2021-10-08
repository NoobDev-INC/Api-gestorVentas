//const express= require('express');
import Express from 'express';

const app=Express()
app.use(Express.json())

app.get('/productos',(req,res)=>{
    console.log('alguien hizo get en /productos');
    const productos=[
        {name: 'corola', brand:'toyota', id:'2014', price:20000000},
        {name: 'corola', brand:'toyota', id:'2014',price:4000000},
    ];

    res.send(productos);
});

app.post('/productos/nuevo',(req,res)=>{
    //implementar código para crear productos en la BD
    const datosproducto=req.body;
    console.log('llaves: ', Object.keys(datosproducto));
    try{
        if (
            Object.keys(datosproducto).includes('name')&& 
            Object.keys(datosproducto).includes('brand')&&
            Object.keys(datosproducto).includes('id')&&
            Object.keys(datosproducto).includes('price')
        ){ 
            res.sendStatus(200);
    
        }else{
            res.sendStatus(500);
        }    
    }catch{
        res.sendStatus(500);
    }
});

app.listen(5000,()=>{
    console.log('escuchando puerto 5000');
});

