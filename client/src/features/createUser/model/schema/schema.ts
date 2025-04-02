import {z} from "zod";

export const CreateUser = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(30),
  height: z.number().min(0).int(),
  weight: z.number().min(0),
  gender: z.union([z.literal('male'), z.literal('female')]),
  residence: z.string()
})

export type CreateUserSchema = z.infer<typeof CreateUser>