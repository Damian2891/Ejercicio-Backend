import {arregloUsuarios} from '../datos/usuariosData.js'
let UsuariosData=arregloUsuarios;
export class Usuarios{
    //Método para obtener todos los usuarios
    static getUsuarios(){
        return UsuariosData;
    }
    //Método para obtener un usuario por su ID
    static getUsuarioID(id){
        return UsuariosData.find((usuario)=>usuario.idUsuario===id);//Si no hay ningún usuario con ese id el resultado será undefined.
    }
    //Método para crear un nuevo usuario
    static postUsuario(nuevoUsuario){
        const existeUsuario=UsuariosData.find((usuario)=>usuario.idUsuario===nuevoUsuario.idUsuario);
        if(existeUsuario){
            return false;//Ya existe
        }
        UsuariosData.push(nuevoUsuario);//Agregar al arreglo
        return nuevoUsuario;
        
    }
    //Método para actualizar un usuario
    static putUsuario(id, usuarioActualizar){
        const indiceUsuario=UsuariosData.findIndex(usuario => usuario.idUsuario===id && usuario.idUsuario===usuarioActualizar.idUsuario);
        if(indiceUsuario==-1){
            return false;//No encontrado
        }
        //Actualizar
        UsuariosData[indiceUsuario]={...UsuariosData[indiceUsuario],...usuarioActualizar};
        return usuarioActualizar;


    }
    //Método para eliminar un usuario
    static deleteUsuario(id){
        const indiceUsuario=UsuariosData.findIndex(usuario=> usuario.idUsuario===id);
        if(indiceUsuario===-1){
            return false;//No encontrado
        }
        const usuarioEliminado=UsuariosData.splice(indiceUsuario, 1);
        return UsuariosData;
    }

}