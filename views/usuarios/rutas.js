import Express from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
} from '../../controllers/usuarios/userController.js';

const rutasUsuario = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasUsuario.route('/usuarios').get((req, res) => {
  console.log("Obteniendo usuarios")
  getAllUsers(genericCallback(res));
});

rutasUsuario.route('/usuarios').post((req, res) => {
  createUser(req.body, genericCallback(res));
});

rutasUsuario.route('/usuarios/self').get((req, res) => {
  console.log("alguien hizo get en la ruta self")
  consultarOCrearUsuario(req,genericCallback(res))
  //getAllUsers(genericCallback(res));
});

rutasUsuario.route('/usuarios/:id').patch((req, res) => {
  editUser(req.params.id, req.body, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id').delete((req, res) => {
  deleteUser(req.params.id, genericCallback(res));
});

export default rutasUsuario;