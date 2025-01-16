import { z } from "zod";

export const SchemaFormAlterPass = z
  .object({
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "As senhas não correspondem",
      path: ["confirmPassword"],
    }
  );

export type FormDataAlterPassType = z.infer<typeof SchemaFormAlterPass>;
