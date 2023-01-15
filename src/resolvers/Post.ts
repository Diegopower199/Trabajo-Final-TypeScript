import { PostSchema } from "../db/schema.ts";
export const Post = {
    id: (parent: PostSchema): string => parent._id.toString(),
}