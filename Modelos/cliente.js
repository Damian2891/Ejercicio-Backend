import { arregloClientes } from '../datos/clientesData.js';
let ClientesData=arregloClientes;

export class Clientes{
    //Método para obtener todos los clientes
    static getClientes(){
        return ClientesData;
    }
    //Método para obtener un cliente por su ID
    static getClienteID(id){
        return ClientesData.find((cliente)=>cliente.idCliente===id);//Si no hay ningún cliente con ese id el resultado será undefined.
    }
    //Método para crear un nuevo cliente
    static postCliente(nuevoCliente){
        const existeCliente=ClientesData.find((cliente)=>cliente.idCliente===nuevoCliente.idCliente);
        if(existeCliente){
            return false;//Ya existe
        }
        ClientesData.push(nuevoCliente);//Agregar al arreglo
        return nuevoCliente;
        
    }
    //Método para actualizar un cliente
    static putCliente(id, clienteActualizar){
        const indiceCliente=ClientesData.findIndex(cliente => cliente.idCliente===id && cliente.idCliente===clienteActualizar.idCliente);
        if(indiceCliente==-1){
            return false;//No encontrado
        }
        //Actualizar
        ClientesData[indiceCliente]={...ClientesData[indiceCliente],...clienteActualizar};
        return clienteActualizar;
    }

    //Método para eliminar un cliente
    static deleteCliente(id){
        const indiceCliente=ClientesData.findIndex(cliente => cliente.idCliente===id);
        if(indiceCliente===-1){
            return false;//No encontrado
        }
        const clienteEliminado=ClientesData.splice(indiceCliente, 1);
        return ClientesData;
    }

}