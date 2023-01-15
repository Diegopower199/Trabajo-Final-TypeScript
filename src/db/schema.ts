import { ObjectId } from "mongo";
import { Usuario, Post, Comentarios } from "../types.ts";

export type UsuarioSchema = Omit<Usuario, "id" | "token" | "comentariosCreados" | "postCreados"> & {
    _id: ObjectId;
    comentariosCreados?: ObjectId[],
    postCreados?: ObjectId[]
};

export type PostSchema = Omit<Post, "id" | "comentariosPost"> & {
    _id: ObjectId;
    creadorPost: ObjectId,
    comentariosPost?: ObjectId[],
};

export type ComentariosSchema = Omit<Comentarios, "id" | "creadorComentario" | "postOrigen"> & {
    _id: ObjectId;
    creadorComentario: ObjectId,
    postOrigen: ObjectId,
};