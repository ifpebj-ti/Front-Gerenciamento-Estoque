// Login.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/app/login/page";

// --- Mock do RegisterComponent ---
// Para isolar o teste do Login, mockamos o RegisterComponent para que ele renderize um <div> com um data-testid e exiba a prop "route".
jest.mock(
  "./../../../app/_components/AuthForms/RegisterComponent/RegisterComponent",
  () => {
    return function DummyRegisterComponent({ route }: { route: string }) {
      return <div data-testid="register-component">{route}</div>;
    };
  }
);

describe("Login Page", () => {
  test("renderiza o RegisterComponent com a prop route igual a 'login'", () => {
    render(<Login />);

    // Verifica se o componente mockado é renderizado
    const registerComponent = screen.getByTestId("register-component");
    expect(registerComponent).toBeInTheDocument();
    expect(registerComponent).toHaveTextContent("login");
  });
});
