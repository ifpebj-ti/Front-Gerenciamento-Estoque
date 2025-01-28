import { SchemaFormAlterData } from "./../../../app/_zod/SchemaFormAlterData"; // Ajuste o caminho conforme necessário

/* eslint-disable */
describe("SchemaFormAlterData validation", () => {
  it("should validate successfully when all fields are valid", () => {
    const validData = {
      name: "John Doe",
      email: "john.doe@example.com",
    };

    expect(() => SchemaFormAlterData.parse(validData)).not.toThrow();
  });

  it("should fail when name is less than 3 characters", () => {
    const invalidData = {
      name: "Jo",
      email: "john.doe@example.com",
    };

    try {
      SchemaFormAlterData.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["name"], message: "Campo obrigatório" },
      ]);
    }
  });

  it("should fail when email is invalid", () => {
    const invalidData = {
      name: "John Doe",
      email: "not-an-email",
    };

    try {
      SchemaFormAlterData.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["email"], message: "Email inválido!" },
      ]);
    }
  });

  it("should fail when all fields are invalid", () => {
    const invalidData = {
      name: "Jo",
      email: "not-an-email",
    };

    try {
      SchemaFormAlterData.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["name"], message: "Campo obrigatório" },
        { path: ["email"], message: "Email inválido!" },
      ]);
    }
  });
});
