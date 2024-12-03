import { z } from "zod";

const SchemaProduct = z.object({
  title: z.string().min(3, "Campo obrigatório"),
  categories: z.string().min(1, "Campo obrigatório"),
  quantity: z.string().nonempty("Quantidade é obrigatória"),
  criticalQuantityStock: z.string().nonempty("Quantidade é obrigatória"),
  description: z.string().min(1, "Campo obrigatório"),
  unit_price: z.string().min(1, "Campo obrigatório"),
});
export default SchemaProduct;
