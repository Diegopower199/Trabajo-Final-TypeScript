import { ComentariosSchema } from "../db/schema.ts";

export const Comentario = {
    id: (parent: ComentariosSchema): string => parent._id.toString(),
}