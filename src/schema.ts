import { gql } from "graphql_tag";

export const typeDefs = gql`
type Usuario {
  id: ID!
  name: String!
  username: String!
  fechaCreacion: String!
  token: String
}

type Query {
  getMessages(page: Int!, perPage: Int!): [Mensaje!]!
}
type Mutation {
  createUser(username: String!, password: String!): Usuario!
  login(username: String!, password: String!): String!
  deleteUser: Usuario!
  sendMessage(destinatario: String!, menssage: String!): Mensaje!
}
`;

/*
export type Usuario = {
  id: string;
  username: string;
  name: string;
  surname: string;
  password?: string;
  token?: string;
  fechaCreacion: Date;
  comentariosCreados?: string[];
  postCreados?: string[];
  tipoUsuario: TipoUsuario
};

export type Post = {
  id: string;
  creadorPost: string;
  titular: string;
  cuerpoPost: string;
  fechaCreacion: Date;
  comentariosPost?: string[],
};

export type Comentarios = {
  id: string,
  creadorComentario: string,
  postOrigen: string,
  contenido: string,
  fechaCreacion: Date,
};*/