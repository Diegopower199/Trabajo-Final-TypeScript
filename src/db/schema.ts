import { ObjectId } from "mongo";
import { Usuario, Post, Comentarios } from "../types.ts";

export type UsuarioSchema = Omit<Usuario, "id" | "token" | "comentariosCreados" | "postCreados"> & {
    _id: ObjectId;
    comentariosCreados?: ObjectId[],
    postCreados?: ObjectId[]
};

export type PostSchema = Omit<Post, "id"> & {
    _id: ObjectId;
    creadorPost: ObjectId,
};

export type ComentariosSchema = Omit<Comentarios, "id"> & {
    _id: ObjectId;
    creadorComentario: ObjectId,
};