import mongoose,{model} from "mongoose";
import { conexion } from "../helpers/conexionMDB.js";
conexion();

const clientesEsquema=new mongoose.Schema({
        idCliente:{type:Number,required:true,unique:true},
        cedulaCliente:{type:String,required:true},
        nomCliente:{type:String,required:true},
        telCelular:{type:String,required:true},
        direccion:{type:String,required:true},
        email:{type:String,required:true}
    },{versionKey:false}
);

const ClienteDB=model('clientes',clientesEsquema);

export class ClientesCMDB{
    //Método para obtener todos los clientes
    static async getClientes(){
        try{
            return await ClienteDB.find();
        }catch(error){
            console.log(error);
        }
    }
    //Método para obtener un cliente por su ID
    static async getClienteID(id){
        try{
            return await ClienteDB.findOne({idCliente:id});
        }catch(error){
            console.log(error);
        }
    }
    //Método para crear un nuevo cliente
    static async postCliente(nuevoCliente){
        const clienteCrear=new ClienteDB(nuevoCliente);
        try{
            return await clienteCrear.save();
        }catch(error){
            console.log(error);
        }
    }
    //Método para actualizar un cliente
    static async putCliente(id, clienteActualizar){
        try{
            return await ClienteDB.findOneAndUpdate({idCliente:id},{...clienteActualizar},{new:true});
        }catch(error){
            console.log(error);
        }
    }

    //Método para eliminar un cliente
    static async deleteCliente(id){
        try{
            return await ClienteDB.findOneAndDelete({idCliente:id}).select("-_id");
        }catch(error){
            console.log(error);
        }
    }



}