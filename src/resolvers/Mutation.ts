import { ObjectId } from "mongo";
import { PostCollection, UsuarioCollection } from "../db/dbconnection.ts";
import { PostSchema, UsuarioSchema } from "../db/schema.ts";
import { TipoUsuario, Usuario } from "../types.ts";
import * as bcrypt from "bcrypt";
import { createJWT } from "../lib/jwt.ts";

export const Mutation = {
  register: async (
    parent: unknown,
    args: {
      username: string;
      password: string;
      name: string;
      surname: string;
      tipoUsuario: TipoUsuario;
    },
  ): Promise<UsuarioSchema & { token: string }> => {
    try {
      const user: UsuarioSchema | undefined = await UsuarioCollection.findOne({
        username: args.username,
      });
      if (user) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(args.password);
      const _id = new ObjectId();
      const fecha = new Date();
      const token = await createJWT(
        {
          username: args.username,
          name: args.name,
          surname: args.surname,
          tipoUsuario: args.tipoUsuario,
          fechaCreacion: fecha,
          id: _id.toString(),
        },
        Deno.env.get("JWT_SECRET")!,
      );
      const newUser: UsuarioSchema = {
        _id,
        username: args.username,
        password: hashedPassword,
        name: args.name,
        surname: args.surname,
        tipoUsuario: args.tipoUsuario,
        fechaCreacion: fecha,
      };
      await UsuarioCollection.insertOne(newUser);
      return {
        ...newUser,
        token,
      };
    } catch (e) {
      throw new Error(e);
    }
  },
  login: async (
    parent: unknown,
    args: {
      username: string;
      password: string;
    },
  ): Promise<string> => {
    try {
      const user: UsuarioSchema | undefined = await UsuarioCollection.findOne({
        username: args.username,
      });
      if (!user) {
        throw new Error("User does not exist");
      }
      
      let validPassword: boolean;

      if (user.password) {
        validPassword = await bcrypt.compare(args.password, user.password);
      } 
      
      else {
        validPassword = false;
      }


      if (!validPassword) {
        throw new Error("Invalid password");
      }
      
      const token = await createJWT(
        {
          username: user.username,
          name: user.name,
          surname: user.surname,
          tipoUsuario: user.tipoUsuario,
          fechaCreacion: user.fechaCreacion,
          id: user._id.toString(),
        },
        Deno.env.get("JWT_SECRET")!,
      );
      return token;
    } catch (e) {
      throw new Error(e);
    }
  },

  crearPost: async (_: unknown, args: { usuario_id: string, titular: string, cuerpo: string },): Promise<PostSchema> => {
    try {
        const usuarioExiste: UsuarioSchema | undefined = await UsuarioCollection.findOne( {
            _id: new ObjectId(args.usuario_id),
        });

        if (!usuarioExiste) {
            throw new Error("El usuario no existe");
        }

        if (usuarioExiste.tipoUsuario !== "AUTOR") {
            throw new Error ("No puedes crear un post con ese tipo de usuario, solo se puede como autor");
        }

        const date = new Date ();

        const post: ObjectId = await PostCollection.insertOne ({
            creadorPost: new ObjectId(args.usuario_id),
            titular: args.titular,
            cuerpoPost: args.cuerpo,
            fechaCreacion: date,
            comentariosPost: [],
        });

        return {
            _id: post,
            creadorPost: new ObjectId(args.usuario_id),
            titular: args.titular,
            cuerpoPost: args.cuerpo,
            fechaCreacion: date,
            comentariosPost: [],
        }
       
    }

    catch (e) {
        throw new Error(e);
    }
  },
};
