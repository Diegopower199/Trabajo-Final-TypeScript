import { gql } from "graphql_tag";

export const typeDefs = gql`

enum TipoUsuario {
  REGISTRADO
  AUTOR
}

type Usuario {
  id: ID!
  username: String!
  name: String!
  surname: String!
  token: String
  fechaCreacion: String!
  comentariosCreados: [Comentario!]
  postCreados: [Post!]
  tipoUsuario: TipoUsuario
}

type Post {
  id: ID!
  creadorPost: ID!
  titular: String!
  cuerpoPost: String!
  fechaCreacion: String!
  comentariosPost: [Comentario!]
}

type Comentario {
  id: ID!,
  creadorComentario: ID!,
  postOrigen: ID!,
  contenido: String!,
  fechaCreacion: String!,
}

type Query {
  leerPosts(titulo: String!, usuarioCreadorPost: ID!): [Post!]!
  leerComentarios(post_id: String): [Comentario!]!
}
type Mutation {
  register(username: String!, password: String!, name: String!, surname: String!, tipoUsuario: TipoUsuario!): Usuario!
  login(username: String!, password: String!): String!
  crearPost(usuario_id: String!, titular: String!, cuerpo: String!): Post!
  crearComentarios(usuario_id: String!, post_id: String!, contenido: String): Comentario!
  updatePost(usuario_id: String!, post_id: String!, titular: String!, cuerpoPost: String): Post!
  updateComentarios(usuario_id: String!, comentario_id: String!, contenido: String!): Comentario!
  deletePost(usuario_id: String!, post_id: String!): Post!
  deleteComentarios(usuario_id: String!, post_id: String!, comentario_id: String!): Comentario!
}
`;

/*

deletePost(): Post!
  deleteComentarios(usuario_id: String!, comentario_id: String!,): Comentario!
*/

// // TENGO QUE CAMBIAR LAS COSAS DE USUARIO_ID O POST_ID POR LOS TOKEN DE LOS USUARIOS 