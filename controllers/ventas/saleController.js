import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const getAllSales = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').find().limit(55).toArray(callback);
};

const createSale = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').insertOne(datosUsuario, callback);
};

const editSale = async (saleId, data, callback) => {
  const filtroUsuario = { _id: new ObjectId(saleId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('ventas')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteSale = async (saleId, callback) => {
  const filtroUsuario = { _id: new ObjectId(saleId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').deleteOne(filtroUsuario, callback);
};

export { getAllSales, createSale, editSale, deleteSale };