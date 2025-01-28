import SchemaChangePass from "./../../../app/_zod/SchemaChangePass";
/* eslint-disable */
describe("SchemaChangePass validation", () => {
  it("should validate successfully when all fields are valid", () => {
    const validData = {
      password: "password123",
      confirm_pass: "password123",
      verify_code: "123456",
    };

    expect(() => SchemaChangePass.parse(validData)).not.toThrow();
  });

  it("should fail when password is less than 6 characters", () => {
    const invalidData = {
      password: "123",
      confirm_pass: "123",
      verify_code: "123456",
    };

    try {
      SchemaChangePass.parse(invalidData);
    } catch (error: any) {
      // Simplifica os erros retornados para focar em `path` e `message`
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["password"], message: "Campo obrigatório" },
        { path: ["confirm_pass"], message: "Campo obrigatório" },
      ]);
    }
  });

  it("should fail when passwords do not match", () => {
    const invalidData = {
      password: "password123",
      confirm_pass: "password456",
      verify_code: "123456",
    };

    try {
      SchemaChangePass.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["confirm_pass"], message: "As senhas não correspondem" },
      ]);
    }
  });

  it("should fail when verify_code is less than 6 characters", () => {
    const invalidData = {
      password: "password123",
      confirm_pass: "password123",
      verify_code: "123",
    };

    try {
      SchemaChangePass.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["verify_code"], message: "Campo obrigatório" },
      ]);
    }
  });

  it("should fail when all fields are invalid", () => {
    const invalidData = {
      password: "",
      confirm_pass: "",
      verify_code: "123",
    };

    try {
      SchemaChangePass.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["password"], message: "Campo obrigatório" },
        { path: ["confirm_pass"], message: "Campo obrigatório" },
        { path: ["verify_code"], message: "Campo obrigatório" },
      ]);
    }
  });
});
