import zod from 'zod';
const articuloSchema=zod.object({
    id: zod.number(),
    titulo: zod.string(),
    cuerpo: zod.string(),
    usuario: zod.string(),
});

export const validarArticulo =(articulo)=>{
   return articuloSchema.safeParse(articulo);
}

export const validarParcial=(articulo)=>{
    return articuloSchema.partial().safeParse(articulo);
 }


const usuariosEsquema=zod.object({
    idUsuario:zod.number().positive(),//Asegura que idUsuario sea un número entero positivo
    nomUsuario:zod.string().min(3),//Asegura que el nombre de usuario tenga al menos 3 caracteres
    emailUsuario:zod.string().email(),//Asegura que el email sea válido
    contrasenia:zod.string().min(8),//Asegura que la contraseña tenga al menos 8 caracteres
    rol:zod.enum(['admin', 'user'])//Asegura que el rol sea 'admin' o 'user'

});
export const validarUsuario=(usuario)=>{
    return usuariosEsquema.safeParse(usuario);
}
export const validarParcialUsuario=(usuario)=>{
    return usuariosEsquema.partial().safeParse(usuario);
}

const clientesEsquema=zod.object({
    idCliente: zod.number().positive(),
    cedulaCliente: zod.string().length(10),
    nomCliente: zod.string().min(3),
    telCelular: zod.string().length(10),
    direccion: zod.string().min(5),
    email: zod.string().email(),

});

export const validarCliente=(cliente)=>{
    return clientesEsquema.safeParse(cliente);
}
export const validarParcialCliente=(cliente)=>{
    return clientesEsquema.partial().safeParse(cliente);
}