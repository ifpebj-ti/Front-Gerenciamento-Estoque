import SchemaProduct from "./../../../app/_zod/SchemaProduct"; // Ajuste o caminho conforme necessário

/* eslint-disable */
describe("SchemaProduct validation", () => {
  it("should validate successfully when all fields are valid", () => {
    const validData = {
      title: "Product Title",
      quantity: "10",
      criticalQuantityStock: "5",
      categories: [1, 2],
      description: "Product description",
      unit_price: "100.00",
    };

    expect(() => SchemaProduct.parse(validData)).not.toThrow();
  });

  it("should fail when title is less than 3 characters", () => {
    const invalidData = {
      title: "Pr",
      quantity: "10",
      criticalQuantityStock: "5",
      categories: [1],
      description: "Product description",
      unit_price: "100.00",
    };

    try {
      SchemaProduct.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["title"], message: "Campo obrigatório" },
      ]);
    }
  });

  it("should fail when quantity is empty", () => {
    const invalidData = {
      title: "Product Title",
      quantity: "",
      criticalQuantityStock: "5",
      categories: [1],
      description: "Product description",
      unit_price: "100.00",
    };

    try {
      SchemaProduct.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["quantity"], message: "Quantidade é obrigatória" },
      ]);
    }
  });

  it("should fail when categories is empty", () => {
    const invalidData = {
      title: "Product Title",
      quantity: "10",
      criticalQuantityStock: "5",
      categories: [],
      description: "Product description",
      unit_price: "100.00",
    };

    try {
      SchemaProduct.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["categories"], message: "Selecione pelo menos uma categoria" },
      ]);
    }
  });

  it("should fail when description is empty", () => {
    const invalidData = {
      title: "Product Title",
      quantity: "10",
      criticalQuantityStock: "5",
      categories: [1],
      description: "",
      unit_price: "100.00",
    };

    try {
      SchemaProduct.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["description"], message: "Campo obrigatório" },
      ]);
    }
  });

  it("should fail when unit_price is empty", () => {
    const invalidData = {
      title: "Product Title",
      quantity: "10",
      criticalQuantityStock: "5",
      categories: [1],
      description: "Product description",
      unit_price: "",
    };

    try {
      SchemaProduct.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["unit_price"], message: "Campo obrigatório" },
      ]);
    }
  });

  it("should fail when all fields are invalid", () => {
    const invalidData = {
      title: "Pr",
      quantity: "",
      criticalQuantityStock: "",
      categories: [],
      description: "",
      unit_price: "",
    };

    try {
      SchemaProduct.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["title"], message: "Campo obrigatório" },
        { path: ["quantity"], message: "Quantidade é obrigatória" },
        {
          path: ["criticalQuantityStock"],
          message: "Quantidade é obrigatória",
        },
        { path: ["categories"], message: "Selecione pelo menos uma categoria" },
        { path: ["description"], message: "Campo obrigatório" },
        { path: ["unit_price"], message: "Campo obrigatório" },
      ]);
    }
  });
});
