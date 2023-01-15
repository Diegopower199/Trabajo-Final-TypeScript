import { UsuarioSchema } from "../db/schema.ts";

export const Usuario = {
    id: (parent: UsuarioSchema): string => parent._id.toString(),
}