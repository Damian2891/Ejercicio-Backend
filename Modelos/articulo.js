import {articulos} from "../datos/articulosData.js";//Importa la lista de artículos desde un archivo de datos
let articulosDevolver=articulos;
export class Articulo{
    //Método para obtener todos los artículos
    static  getAll(){
        return articulosDevolver;
    }
    //Método para obtener un artículo por su ID
    static getOneBiID(id){
        return articulosDevolver.find(articulo=>articulo.id == id);
    }
    //Método para eliminar un artículo por su ID
    static delete(id){
        return articulosDevolver.filter(articulo=>articulo.id!=id);
    }
    //Método para crear un nuevo artículo
    static create(articulo){
        if(!articulo.success){
            return Error;//Si la validación falla (artículo no es válido), se devuelve un objeto de error
        }
        const nuevoArticulo={...articulo.data}
        articulosDevolver=[...articulosDevolver,nuevoArticulo];//Añade el nuevo artículo a la lista de artículos
        return nuevoArticulo;
    }
    //Método para actualizar un artículo existente
    static update(id,articulo){
        if(!articulo.success){
            response.status(400).json('Validacion de datos sale Incorrecto')
        }
        const articuloIndice=articulosDevolver.findIndex(articulo =>articulo.id==id);
        if(articuloIndice==-1){
            return response.status(400).json('Articulo no encontrado');
        }
        const nuevoArticulo={
        ...articulosDevolver[articuloIndice],
        ...articulo.data
        }
        articulosDevolver[articuloIndice] = nuevoArticulo;
        return nuevoArticulo;
        }
    }
