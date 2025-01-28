import SchemaLoginForm from "./../../../app/_zod/SchemaLoginForm"; // Ajuste o caminho conforme necessário

/* eslint-disable */
describe("SchemaLoginForm validation", () => {
  it("should validate successfully when all fields are valid", () => {
    const validData = {
      email: "john.doe@example.com",
      password: "password123",
    };

    expect(() => SchemaLoginForm.parse(validData)).not.toThrow();
  });

  it("should fail when email is invalid", () => {
    const invalidData = {
      email: "not-an-email",
      password: "password123",
    };

    try {
      SchemaLoginForm.parse(invalidData);
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

  it("should fail when email is missing", () => {
    const invalidData = {
      password: "password123",
    };

    try {
      SchemaLoginForm.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["email"], message: "Required" },
      ]);
    }
  });

  it("should fail when password is missing", () => {
    const invalidData = {
      email: "john.doe@example.com",
    };

    try {
      SchemaLoginForm.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["password"], message: "Required" },
      ]);
    }
  });

  it("should fail when all fields are missing", () => {
    const invalidData = {};

    try {
      SchemaLoginForm.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["email"], message: "Required" },
        { path: ["password"], message: "Required" },
      ]);
    }
  });
});
