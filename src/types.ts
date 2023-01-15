export enum TipoUsuario {
  REGISTRADO = "REGISTRADO",
  AUTOR = "AUTOR"
}


export type Usuario = {
  id: string,
  username: string,
  name: string,
  surname: string,
  password?: string,
  token?: string,
  fechaCreacion: Date,
  comentariosCreados?: string[],
  postCreados?: string[],
  tipoUsuario: TipoUsuario,
};

export type Post = {
  id: string,
  creadorPost: string,
  titular: string,
  cuerpoPost: string,
  fechaCreacion: Date,
  comentariosPost: string[],
};

export type Comentario = {
  id: string,
  creadorComentario: string,
  postOrigen: string,
  contenido: string,
  fechaCreacion: Date,
};