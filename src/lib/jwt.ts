import { create, Header, Payload, verify } from "jwt";
import { Usuario } from "../types.ts";

const encoder = new TextEncoder();

const generateKey = async (secretKey: string): Promise<CryptoKey> => {
  const keyBuf = encoder.encode(secretKey);
  return await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"]
  );
};

export const createJWT = async (
  payload: Usuario,
  secretKey: string
): Promise<string> => {
  const header: Header = {
    alg: "HS256",
  };

  const key = await generateKey(secretKey);

  return create(header, payload, key);
};

export const verifyJWT = async (
  token: string,
  secretKey: string
): Promise<Payload> => {
    const key = await generateKey(secretKey);
    return await verify(token, key);

};