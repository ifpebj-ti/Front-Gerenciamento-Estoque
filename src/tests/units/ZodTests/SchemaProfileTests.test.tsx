import { SchemaFormAlterPass } from "../../../app/_zod/SchemaProfileAlterPass";

/* eslint-disable */
describe("SchemaFormAlterPass validation", () => {
  it("should validate successfully when both passwords match", () => {
    const validData = {
      password: "password123",
      confirmPassword: "password123",
    };

    expect(() => SchemaFormAlterPass.parse(validData)).not.toThrow();
  });

  it("should validate successfully when no passwords are provided (optional fields)", () => {
    const validData = {};

    expect(() => SchemaFormAlterPass.parse(validData)).not.toThrow();
  });

  it("should fail when passwords do not match", () => {
    const invalidData = {
      password: "password123",
      confirmPassword: "differentPassword123",
    };

    try {
      SchemaFormAlterPass.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["confirmPassword"], message: "As senhas não correspondem" },
      ]);
    }
  });

  it("should fail when confirmPassword is provided but password is missing", () => {
    const invalidData = {
      confirmPassword: "password123",
    };

    try {
      SchemaFormAlterPass.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["confirmPassword"], message: "As senhas não correspondem" },
      ]);
    }
  });

  it("should fail when password is provided but confirmPassword is missing", () => {
    const invalidData = {
      password: "password123",
    };

    try {
      SchemaFormAlterPass.parse(invalidData);
    } catch (error: any) {
      const simplifiedErrors = error.errors.map((err: any) => ({
        path: err.path,
        message: err.message,
      }));

      expect(simplifiedErrors).toEqual([
        { path: ["confirmPassword"], message: "As senhas não correspondem" },
      ]);
    }
  });
});
