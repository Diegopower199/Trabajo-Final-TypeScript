import { ComentarioCollection } from "../db/dbconnection.ts";
import { ComentariosSchema, PostSchema } from "../db/schema.ts";
export const Post = {
    id: (parent: PostSchema): string => parent._id.toString(),
    
    comentariosPost: async (parent: PostSchema,): Promise<ComentariosSchema[]> => {
        try {
          return await ComentarioCollection.find({ _id: { $in: parent.comentariosPost } }).toArray();
        }
    
        catch (error) {
          throw new Error(error);
        }
      },
}