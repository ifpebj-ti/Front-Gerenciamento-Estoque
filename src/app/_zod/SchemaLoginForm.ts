import { z } from "zod";

const SchemaLoginForm = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string(),
});

export default SchemaLoginForm;
