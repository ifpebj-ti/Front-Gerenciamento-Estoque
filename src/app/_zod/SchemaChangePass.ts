import { z } from "zod";

const SchemaChangePass = z
  .object({
    password: z.string().min(6, "Campo obrigatório"),
    confirm_pass: z.string().min(6, "Campo obrigatório"),
    verify_code: z.string().min(6, "Campo obrigatório"),
  })
  .refine(
    (data) => {
      if (data.password !== data.confirm_pass) {
        return false;
      }
      return true;
    },
    {
      message: "As senhas não correspondem",
      path: ["confirm_pass"],
    }
  );

export default SchemaChangePass;
