import { validarArticulo,validarParcial} from "../helpers/zod.js";

export class ArticuloController{
    constructor(modelo){
        this.modelo=modelo;
        //Vincula el método getAll al contexto de la clase asegura que this dentro de getAll
        this.getAll=this.getAll.bind(this);
        console.log(this.modelo);
        //console.log(this.getAll);
    }
    //Método para obtener todos los artículos
    /*getAll=async(request,response)=>{
        response.json(await this.modelo.getAll());
    }*/
    async getAll(request,response){ 
        console.log(this.modelo);  
        response.json(await this.modelo.getAll());
    }

    //Método para obtener un artículo por su ID
    getOneBiID=async(request,response)=>{
        const id=Number(request.params.id);
        const articulo=await this.modelo.getOneBiID(id);//Busca el artículo por ID
        if(articulo){
            response.json(articulo);//Si lo encuentra, lo devuelve en JSON
        }else{
            response.status(400).end();//Si no lo encuentra, responde con 400
        }
    }

    //Método para eliminar un artículo
    delete=async(request,response)=>{
        const id=Number(request.params.id);
        const articulosDevolver=await this.modelo.delete(id);//Elimina el artículo
        if(articulosDevolver){
            response.json(articulosDevolver);//Si lo encuentra, lo devuelve en JSON
        }else{
            response.status(400).end();//Si no lo encuentra, responde con 400
        } 
    }   
    //Método para crear un nuevo artículo
    create=async(request,response)=>{
        const articulo=validarArticulo(request.body);//Valida el cuerpo de la solicitud con zod
        if(articulo.error){
            return response.status (400).json('Validación de datos es Incorrecta');
        }
        const nuevoArticulo=await this.modelo.create(articulo);//Crea un nuevo artículo
        response.json(nuevoArticulo);
    }

    //Método para actualizar un artículo existente
     update=async(request,response)=>{
        const id=Number(request.params.id);
        const articuloValidado=validarParcial(request.body);//Valida el cuerpo de la solicitud con zod
        const nuevoArticulo=await this.modelo.update(id,articuloValidado);//Actualiza el artículo con el ID proporcionado
        response.json(nuevoArticulo);
    }

}
    
/*import { validarArticulo,validarParcial} from "../helpers/zod.js";
import { Articulo } from "../Modelos/articulo.js";

export class ArticuloController{
    //Método para obtener todos los artículos
    static async getAll(request,response){   
        response.json(await Articulo.getAll());
    }

    //Método para obtener un artículo por su ID
    static async getOneBiID(request,response){
        const id=Number(request.params.id);
        const articulo=await Articulo.getOneBiID(id);//Busca el artículo por ID
        if(articulo){
            response.json(articulo);//Si lo encuentra, lo devuelve en JSON
        }else{
            response.status(400).end();//Si no lo encuentra, responde con 400
        }
    }

    //Método para eliminar un artículo
    static async delete(request,response){
        const id=Number(request.params.id);
        const articulosDevolver=await Articulo.delete(id);//Elimina el artículo
        if(articulosDevolver){
            response.json(articulosDevolver);//Si lo encuentra, lo devuelve en JSON
        }else{
            response.status(400).end();//Si no lo encuentra, responde con 400
        } 
    }   
    //Método para crear un nuevo artículo
    static async create(request,response){
        const articulo=validarArticulo(request.body);//Valida el cuerpo de la solicitud con zod
        if(articulo.error){
            return response.status (400).json('Validación de datos es Incorrecta');
        }
        const nuevoArticulo=await Articulo.create(articulo);//Crea un nuevo artículo
        response.json(nuevoArticulo);
    }

    //Método para actualizar un artículo existente
    static async update(request,response){
        const id=Number(request.params.id);
        const articuloValidado=validarParcial(request.body);//Valida el cuerpo de la solicitud con zod
        const nuevoArticulo=await Articulo.update(id,articuloValidado);//Actualiza el artículo con el ID proporcionado
        response.json(nuevoArticulo);
    }

}
    */