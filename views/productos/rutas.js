import Express from 'express';
import { queryAllProductos,crearProducto,editarProducto, eliminarProducto } from '../../controllers/productos/controller.js';


const rutasProducto=Express.Router();
const generCallback=(res)=>(err,result)=>{
    if(err){
        res.Status(500).send('Error consultando los productos');
    }
    else{
        res.json(result);
    }
};

rutasProducto.route('/menu/productos').get((req,res)=>{
    console.log('alguien hizo get en /productos');
    queryAllProductos(generCallback(res));
    
});

rutasProducto.route('/menu/productos/:id').post((req,res)=>{
    //implementar código para crear productos en la BD
    crearProducto(req.body,generCallback(res));
});

rutasProducto.route('/menu/productos').get((req,res)=>{
    console.log('alguien hizo get en /productos');
    consultarProducto(req.params.id,generCallback(res));
    
});

rutasProducto.route('/menu/productos/:id').patch((req,res)=>{
    editarProducto(req.params.id,req.body,generCallback(res));
    
});

rutasProducto.route('/menu/productos/:id').delete((req,res)=>{
    eliminarProducto(req.params.id,generCallback(res));
});
export default rutasProducto;