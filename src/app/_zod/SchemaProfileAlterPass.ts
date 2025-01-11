import { z } from "zod";

export const SchemaFormAlterPass = z
  .object({
    password: z.string().min(6, "Senha muito curta"),
    confirmPassword: z.string().min(6, "Senha muito curta"),
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
