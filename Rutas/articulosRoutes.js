import {Router} from "express";
import {ArticuloController} from "../Controllers/articuloController.js";
export const EnrutadorArticulo=(modelo)=>{
    const controlador=new ArticuloController(modelo);
    const articuloRouter=Router();
    articuloRouter.get('/',controlador.getAll);
    articuloRouter.get('/:id',controlador.getOneBiID);
    articuloRouter.delete('/:id',controlador.delete);
    articuloRouter.post('/',controlador.create);
    articuloRouter.put('/:id',controlador.update);
    return articuloRouter;
}




/*import {Router} from "express";
import {ArticuloController} from "../Controllers/articuloController.js";

export const articuloRouter=Router();

articuloRouter.get('/',ArticuloController.getAll);
articuloRouter.get('/:id',ArticuloController.getOneBiID);
articuloRouter.delete('/:id',ArticuloController.delete);
articuloRouter.post('/',ArticuloController.create);
articuloRouter.put('/:id',ArticuloController.update);
*/