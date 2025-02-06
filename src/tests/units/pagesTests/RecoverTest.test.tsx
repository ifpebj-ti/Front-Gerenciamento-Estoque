// Recover.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Recover from "@/app/recover/page";

// --- Mock do RegisterComponent ---
// Substituímos o componente real por um dummy que renderiza um <div>
// com um data-testid e exibe o valor da prop "route"
jest.mock(
  "./../../../app/_components/AuthForms/RegisterComponent/RegisterComponent",
  () => {
    return function DummyRegisterComponent({ route }: { route: string }) {
      return <div data-testid="register-component">{route}</div>;
    };
  }
);

describe("Recover Page", () => {
  test("renderiza o RegisterComponent com a prop route igual a 'recover'", () => {
    render(<Recover />);

    const registerComponent = screen.getByTestId("register-component");
    expect(registerComponent).toBeInTheDocument();
    expect(registerComponent).toHaveTextContent("recover");
  });
});
