import { z } from "zod";

export const SchemaFormAlterData = z.object({
  name: z.string().min(3, "Campo obrigatório"),
  email: z.string().email("Email inválido!"),
});

export type FormDataAlterDataType = z.infer<typeof SchemaFormAlterData>;
