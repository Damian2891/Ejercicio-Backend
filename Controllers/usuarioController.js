import {validarParcialUsuario, validarUsuario} from '../helpers/zod.js'

export class UsuarioController{
    constructor(modelo){
        this.modelo=modelo;
    }
    //Método para obtener todos los usuarios
    getConUsuarios=async(request,response)=>{
        response.json(await this.modelo.getUsuarios());
    }
    //Método para obtener un usuario por su ID
    getConUsuarioID=async(request,response)=>{
        const idUsuario=parseInt(request.params.id);
        const usuario=await this.modelo.getUsuarioID(idUsuario);
        console.log(usuario);
        if(usuario){
            response.json(usuario);//Si lo encuentra, lo devuelve en JSON 
        }else{
            response.status(404).json({error:`El usuario con ID ${idUsuario} no existe...!`});//Si no lo encuentra, responde con 404 Not Found
        }
    }
    
    //Método para crear un nuevo usuario
    postConUsuario=async(request,response)=>{
        const usuario=validarUsuario(request.body);
        console.log(usuario.error);
        if(usuario.success){
            const nuevoUsuario=await this.modelo.postUsuario(usuario.data);
            console.log(nuevoUsuario);
            if(nuevoUsuario){
                response.json(nuevoUsuario);
            }else{
                response.status(400).json({error:`El usuario con ID ${usuario.data.idUsuario} ya existe...!`});//Si no lo encuentra, responde con 404 Not Found

            }
            
        }else{
            console.log(usuario.error.errors);
            response.status(400).json({ error: "Error en los datos: " + 
                usuario.error.errors.map(error=>{ return `Campo ${error.path.join('.')} - ${error.message}`;}).join(", ")});
        }
        
    }
    //Método para actualizar un artículo existente
    putConUsuario=async(request,response)=>{
        const idUsuario=parseInt(request.params.id);
        const usuarioValidado=validarParcialUsuario(request.body);
        if(usuarioValidado.success){
            if(idUsuario!==usuarioValidado.data.idUsuario){
                response.status(400).json({ error: "El ID de la URL y el ID del objeto del cuerpo de la solicitud no coinciden..!"})
                return;
            }
            const usaurioActualizar=await this.modelo.putUsuario(idUsuario,usuarioValidado.data);
            console.log(usaurioActualizar);
            if(usaurioActualizar){
                response.json(usaurioActualizar);
            }else{
                response.status(404).json({error:`El usuario con ID ${idUsuario} no existe...!`}); 
            }
        }else{
            response.status(400).json({ error: "Error en los datos: " + 
                usuarioValidado.error.errors.map(error=>{ return `Campo ${error.path.join('.')} - ${error.message}`;}).join(", ")});
        }
    }
    //Método para eliminar un usuario
    deleteConUsuario=async(request,response)=>{
        const idUsuario=parseInt(request.params.id);
        const usuariosSinEliminar=await this.modelo.deleteUsuario(idUsuario);
        if(usuariosSinEliminar){
            response.json(usuariosSinEliminar);
        }else{
            response.status(404).json({error:`El usuario con ID ${idUsuario} no existe...!`});
        }
            
    }   

}

/*
import {validarParcialUsuario, validarUsuario} from '../helpers/zod.js'
import {Usuarios} from '../Modelos/usuarios.js'
export class UsuarioController{
    //Método para obtener todos los usuarios
    static async getConUsuarios(request,response){
        response.json(await Usuarios.getUsuarios());
    }
    //Método para obtener un usuario por su ID
    static async getConUsuarioID(request,response){
        const idUsuario=parseInt(request.params.id);
        const usuario=await Usuarios.getUsuarioID(idUsuario);
        if(usuario){
            response.json(usuario);//Si lo encuentra, lo devuelve en JSON 
        }else{
            response.status(404).json({error:`El usuario con ID ${idUsuario} no existe...!`});//Si no lo encuentra, responde con 404 Not Found
        }
    }
    
    //Método para crear un nuevo usuario
    static async postConUsuario(request,response){
        const usuario=validarUsuario(request.body);
        console.log(usuario.error);
        if(usuario.success){
            const nuevoUsuario=await Usuarios.postUsuario(usuario.data);
            if(nuevoUsuario){
                response.json(nuevoUsuario);
            }else{
                response.status(400).json({error:`El usuario con ID ${usuario.data.idUsuario} ya existe...!`});//Si no lo encuentra, responde con 404 Not Found

            }
            
        }else{
            console.log(usuario.error.errors);
            response.status(400).json({ error: "Error en los datos: " + 
                usuario.error.errors.map(error=>{ return `Campo ${error.path.join('.')} - ${error.message}`;}).join(", ")});
        }
        
    }
    //Método para actualizar un artículo existente
    static async putConUsuario(request,response){
        const idUsuario=parseInt(request.params.id);
        const usuarioValidado=validarParcialUsuario(request.body);
        if(usuarioValidado.success){
            const usaurioActualizar=await Usuarios.putUsuario(idUsuario,usuarioValidado.data);
            if(usaurioActualizar){
                response.json(usaurioActualizar);
            }else{
                response.status(404).json({error:`El usuario con ID ${idUsuario} no existe...!`}); 
            }
        }else{
            response.status(400).json({ error: "Error en los datos: " + 
                usuarioValidado.error.errors.map(error=>{ return `Campo ${error.path.join('.')} - ${error.message}`;}).join(", ")});
        }
    }
    //Método para eliminar un usuario
    static async deleteConUsuario(request,response){
        const idUsuario=parseInt(request.params.id);
        const usuariosSinEliminar=await Usuarios.deleteUsuario(idUsuario);
        if(usuariosSinEliminar){
            response.json(usuariosSinEliminar);
        }else{
            response.status(404).json({error:`El usuario con ID ${idUsuario} no existe...!`});
        }
            
    }   

}*/