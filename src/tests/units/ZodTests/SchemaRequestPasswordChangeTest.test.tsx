import SchemaRequestPasswordChange from "./../../../app/_zod/SchemaRequestPasswordChange"; // Ajuste o caminho conforme necessário

/* eslint-disable */
describe("SchemaRequestPasswordChange validation", () => {
  it("should validate successfully when a valid email is provided", () => {
    const validData = {
      email: "john.doe@example.com",
    };

    expect(() => SchemaRequestPasswordChange.parse(validData)).not.toThrow();
  });

  it("should fail when email is missing", () => {
    const invalidData = {};

    try {
      SchemaRequestPasswordChange.parse(invalidData);
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

  it("should fail when email is invalid", () => {
    const invalidData = {
      email: "invalid-email",
    };

    try {
      SchemaRequestPasswordChange.parse(invalidData);
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
});
