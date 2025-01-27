import {validarParcialCliente,validarCliente} from '../helpers/zod.js'
export class ClienteController{
    constructor(modelo){
        this.modelo=modelo;
    }
    //Método para obtener todos los clientes
    getConClientes=async(request,response)=>{
        response.json(await this.modelo.getClientes());
    }

    //Método para obtener un cliente por su ID
    getConClienteID=async(request,response)=>{
        const idCliente=parseInt(request.params.id);
        const cliente=await this.modelo.getClienteID(idCliente);
        console.log(cliente);
        if(cliente){
            response.json(cliente);//Si lo encuentra, lo devuelve en JSON 
        }else{
            response.status(404).json({error:`El cliente con ID ${idCliente} no existe...!`});
        }
    }
    
    //Método para crear un nuevo cliente
    postConCliente=async(request,response)=>{
        const cliente=validarCliente(request.body);
        if(cliente.success){
            const nuevoCliente=await this.modelo.postCliente(cliente.data);
            console.log(nuevoCliente);
            if(nuevoCliente){
                response.json(nuevoCliente);
            }else{
                response.status(400).json({error:`El cliente con ID ${cliente.data.idCliente} ya existe...!`});

            }
            
        }else{
            console.log(cliente.error.errors);
            response.status(400).json({ error: "Error en los datos: " + 
                cliente.error.errors.map(error=>{ return `Campo ${error.path.join('.')} - ${error.message}`;}).join(", ")});
        }
        
    }
    //Método para actualizar un cliente existente
    putConCliente=async(request,response)=>{
        const idCliente=parseInt(request.params.id);
        const clienteValidado=validarParcialCliente(request.body);
        if(clienteValidado.success){
            if(idCliente!==clienteValidado.data.idCliente){
                response.status(400).json({ error: "El ID de la URL y el ID del objeto del cuerpo de la solicitud no coinciden..!"});
                return;
            }
            const clienteActualizar=await this.modelo.putCliente(idCliente,clienteValidado.data);
            console.log(clienteActualizar);
            if(clienteActualizar){
                response.json(clienteActualizar);
            }else{
                response.status(404).json({error:`El cliente con ID ${idCliente} no existe...!`}); 
            }
        }else{
            response.status(400).json({ error: "Error en los datos: " + 
                clienteValidado.error.errors.map(error=>{ return `Campo ${error.path.join('.')} - ${error.message}`;}).join(", ")});
        }
    }
    //Método para eliminar un cliente
    deleteConCliente=async(request,response)=>{
        const idCliente=parseInt(request.params.id);
        const clientesSinEliminar=await this.modelo.deleteCliente(idCliente);
        console.log(clientesSinEliminar);
        if(clientesSinEliminar){
            response.json(clientesSinEliminar);
        }else{
            response.status(404).json({error:`El cliente con ID ${idCliente} no existe...!`});
        }
            
    }   

}

/*import {validarParcialCliente,validarCliente} from '../helpers/zod.js'
import {Clientes} from '../Modelos/cliente.js'

export class ClienteController{

    //Método para obtener todos los clientes
    static async getConClientes(request,response){
        response.json(await Clientes.getClientes());
    }

    //Método para obtener un cliente por su ID
    static async getConClienteID(request,response){
        const idCliente=parseInt(request.params.id);
        const cliente=await Clientes.getClienteID(idCliente);
        if(cliente){
            response.json(cliente);//Si lo encuentra, lo devuelve en JSON 
        }else{
            response.status(404).json({error:`El cliente con ID ${idCliente} no existe...!`});
        }
    }
    
    //Método para crear un nuevo cliente
    static async postConCliente(request,response){
        const cliente=validarCliente(request.body);
        if(cliente.success){
            const nuevoCliente=await Clientes.postCliente(cliente.data);
            if(nuevoCliente){
                response.json(nuevoCliente);
            }else{
                response.status(400).json({error:`El cliente con ID ${cliente.data.idCliente} ya existe...!`});

            }
            
        }else{
            console.log(cliente.error.errors);
            response.status(400).json({ error: "Error en los datos: " + 
                cliente.error.errors.map(error=>{ return `Campo ${error.path.join('.')} - ${error.message}`;}).join(", ")});
        }
        
    }
    //Método para actualizar un cliente existente
    static async putConCliente(request,response){
        const idCliente=parseInt(request.params.id);
        const clienteValidado=validarParcialCliente(request.body);
        if(clienteValidado.success){
            const clienteActualizar=await Clientes.putCliente(idCliente,clienteValidado.data);
            if(clienteActualizar){
                response.json(clienteActualizar);
            }else{
                response.status(404).json({error:`El cliente con ID ${idCliente} no existe...!`}); 
            }
        }else{
            response.status(400).json({ error: "Error en los datos: " + 
                clienteValidado.error.errors.map(error=>{ return `Campo ${error.path.join('.')} - ${error.message}`;}).join(", ")});
        }
    }
    //Método para eliminar un cliente
    static async deleteConCliente(request,response){
        const idCliente=parseInt(request.params.id);
        const clientesSinEliminar=await Clientes.deleteCliente(idCliente);
        if(clientesSinEliminar){
            response.json(clientesSinEliminar);
        }else{
            response.status(404).json({error:`El cliente con ID ${idCliente} no existe...!`});
        }
            
    }   

}*/