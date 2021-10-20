import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';
import { response } from 'express';

const getAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').find().limit(50).toArray(callback);
};

const createUser = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
};

const editUser = async (userId, data, callback) => {
  console.log(userId)
  const filtroUsuario = { _id: new ObjectId(userId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('usuario')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteUser = async (userId, callback) => {
  const filtroUsuario = { _id: new ObjectId(userId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};

/* const consultarOCrearUsuario = async (req, callback) => {
  const token =  req.headers.authorization.split('Bearer')[i];
  const user = jwt_decode(token)['htpp://localhost/userData'];
  console.log(user);
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuario").findOne({ email: user.email },async (err, response) => {
    console.log('response consulta bd', response);
    if(response){
      callback(err, response);

    }else{
      user.auth0ID = user._id;
      delete user._id;
      user.rol = "inactivo"
      await createUser(user, (err, respuesta) => callback(err,user));
      };
    }
  });
} */

export { getAllUsers, createUser, editUser, deleteUser}; //consultarOCrearUsuario };