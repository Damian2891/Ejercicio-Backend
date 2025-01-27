import {Router} from "express"
import {ClienteController} from '../Controllers/clienteController.js'

export const clientesRutas=(modeloC)=>{
    const clientesRouter=Router();
    const controladorCliente=new ClienteController(modeloC);
    
    clientesRouter.get('/',controladorCliente.getConClientes);
    clientesRouter.get('/:id',controladorCliente.getConClienteID);
    clientesRouter.post('/',controladorCliente.postConCliente);
    clientesRouter.put('/:id',controladorCliente.putConCliente);
    clientesRouter.delete('/:id',controladorCliente.deleteConCliente);

    return clientesRouter;
}



/*import {Router} from "express";
import {ClienteController} from '../Controllers/clienteController.js';

export const clientesRouter=Router();
clientesRouter.get('/',ClienteController.getConClientes);
clientesRouter.get('/:id',ClienteController.getConClienteID);
clientesRouter.post('/',ClienteController.postConCliente);
clientesRouter.put('/:id',ClienteController.putConCliente);
clientesRouter.delete('/:id',ClienteController.deleteConCliente);*/