import {Router} from "express"
import {UsuarioController} from '../Controllers/usuarioController.js'

export const usuariosRutas=(modeloU)=>{
    const usuariosRouter=Router();
    const controladorUsuario=new UsuarioController(modeloU);

    usuariosRouter.get('/',controladorUsuario.getConUsuarios);
    usuariosRouter.get('/:id',controladorUsuario.getConUsuarioID);
    usuariosRouter.post('/',controladorUsuario.postConUsuario);
    usuariosRouter.put('/:id',controladorUsuario.putConUsuario);
    usuariosRouter.delete('/:id',controladorUsuario.deleteConUsuario);
    
    return usuariosRouter;
}


/*
import {Router} from "express";
import {UsuarioController} from '../Controllers/usuarioController.js';
export const usuariosRouter=Router();
usuariosRouter.get('/',UsuarioController.getConUsuarios);
usuariosRouter.get('/:id',UsuarioController.getConUsuarioID);
usuariosRouter.post('/',UsuarioController.postConUsuario);
usuariosRouter.put('/:id',UsuarioController.putConUsuario);
usuariosRouter.delete('/:id',UsuarioController.deleteConUsuario);
*/