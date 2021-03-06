import {getDB} from '../../db/db.js';
import {ObjectId} from 'mongodb';

const queryAllProductos=async (callback)=>{
    const baseDeDatos=getDB();
    await baseDeDatos.collection('productos').find({}).limit(50).toArray(callback);
};

const crearProducto=async(datosproducto, callback)=>{
    
    if (
        Object.keys(datosproducto).includes('name')&& 
        Object.keys(datosproducto).includes('brand')&&
        Object.keys(datosproducto).includes('price')
    ){ 
        //implementar código para crear productos en la BD
        const baseDeDatos=getDB();
        await baseDeDatos.collection('productos').insertOne(datosproducto,callback);
    }else{
        return 'error';
    }    
};

const consultarProducto=async(id,callback)=>{
    const baseDeDatos=getDB();
    await baseDeDatos.collection('productos').findOne({_id:new ObjectId(id)},callback);

}
const editarProducto=async(id,edicion,callback)=>{
    const filtroProducto={ _id: new ObjectId(id)};
    const operacion={
        $set:edicion,
    };
    const baseDeDatos=getDB();
    await baseDeDatos
        .collection('productos')
        .findOneAndUpdate(filtroProducto,operacion,{upsert:true,returnOriginal:true},callback);

};

const eliminarProducto=async(id,callback)=>{
    const filtroProducto={ _id: new ObjectId(id)};
    const baseDeDatos=getDB();
    await baseDeDatos.collection('productos').deleteOne(filtroProducto,callback);
    
};
export{queryAllProductos,crearProducto,consultarProducto,editarProducto,eliminarProducto};
