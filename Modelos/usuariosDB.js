import mongoose,{model} from "mongoose";
import {conexion} from "../helpers/conexionMDB.js";

conexion();//Llama a la función para conectarse a a la base de datos
//Se define el esquema para la colección usuarios
const esquemaUsuarioDB=new mongoose.Schema({
        idUsuario:{type:Number,required:true,unique:true},
        nomUsuario:{type:String,required:true},
        emailUsuario:{type:String,required:true},
        contrasenia:{type:String,required:true},
        rol:{type:String,required:true}
    },{versionKey:false}
);

const UsuarioDB=model('usuarios',esquemaUsuarioDB);

export class UsuariosCMDB{
    //Método para obtener todos los usuarios
    static async getUsuarios(){
        try{
            return await UsuarioDB.find();
        }catch(error){
            console.log('Error al obtener los usuarios...!');
            console.log(error);
        }
    }

    //Método para obtener un usuario por su ID
    static async getUsuarioID(id){
        try{
            return await UsuarioDB.findOne({idUsuario:id});//Si encuentra devuelve el usuario, sino null
        }catch(error){
            console.log('Error al obtener el usuario...!');
            console.log(error);
        }
    }

    //Método para crear un nuevo usuario
    static async postUsuario(nuevoUsuario){
        const usuarioCrear=new UsuarioDB(nuevoUsuario);
        try{  
            return await usuarioCrear.save();
        }catch(error){
            console.log(error);
        }
    }
    //Método para actualizar un usuario
    static async putUsuario(id, usuarioActualizar){
        try{
            //Si encuentra actualiza el usuario sino devuelve null
            return await UsuarioDB.findOneAndUpdate({idUsuario:id},{...usuarioActualizar},{new:true});
        }catch(error){
            console.log(error);
        }
    }
    //Método para eliminar un usuario
    static async deleteUsuario(id){
        try{
            //Si encuentra lo elimina y devuelve el objeto eliminado sino devuelve null
            return UsuarioDB.findOneAndDelete({idUsuario:id}).select('-_id');;
        }catch(error){
            console.log(error);
        }
    }
}

