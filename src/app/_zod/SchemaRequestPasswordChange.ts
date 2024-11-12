import { z } from "zod";

const SchemaRequestPasswordChange = z.object({
  email: z.string().email("Email inválido!"),
});

export default SchemaRequestPasswordChange;
