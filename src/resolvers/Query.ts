import { ObjectId } from "mongo";
import { ComentarioCollection, PostCollection } from "../db/dbconnection.ts";
import { ComentariosSchema, PostSchema, UsuarioSchema } from "../db/schema.ts";
import { verifyJWT } from "../lib/jwt.ts";
import { Usuario } from "../types.ts";

export const Query = {
  leerPosts: async (
    parent: unknown,
    args: { titulo: string; usuarioCreadorPost: string },
  ): Promise<PostSchema[]> => {
    try {
      const postExiste: PostSchema[] | undefined = await PostCollection.find({
        titular: args.titulo,
        creadorPost: new ObjectId(args.usuarioCreadorPost),
      }).toArray();

      if (!postExiste) {
        throw new Error("No existe un post con ese titulo o ese autor");
      }

      return postExiste.map((post: PostSchema) => ({
        _id: post._id,
        creadorPost: post.creadorPost,
        titular: post.titular,
        cuerpoPost: post.cuerpoPost,
        fechaCreacion: post.fechaCreacion,
        comentariosPost: post.comentariosPost,
      }));
    } catch (e) {
      throw new Error(e);
    }
  },

  leerComentarios: async (
    parent: unknown,
    args: { post_id?: string },
  ): Promise<ComentariosSchema[]> => {
    try {
      if (args.post_id) {
        
        const postExiste: PostSchema | undefined = await PostCollection.findOne({
          creadorPost: new ObjectId(args.post_id),
        })

        if (!postExiste) {
          throw new Error("No existe un post con ese ese autor");
        }

        return await ComentarioCollection.find({
            _id: { $in: postExiste.comentariosPost},
        }).toArray();

      }

      const comentarios = await ComentarioCollection.find({}).toArray();
      return comentarios;
    } 
    
    catch (e) {
      throw new Error(e);
    }
  },
};
