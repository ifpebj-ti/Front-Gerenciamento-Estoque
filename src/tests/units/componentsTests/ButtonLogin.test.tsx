import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonLogin from "./../../../app/_components/AuthForms/ButtonLogin/ButtonLogin";

describe("ButtonLogin Component", () => {
  const props = {
    textButton: "Login",
  };

  it("applies styles on mouse enter", () => {
    render(<ButtonLogin {...props} />);
    const button = screen.getByRole("button", { name: "Login" });
    const decoration = button.querySelector("#decorationBtnLogin");
    const arrow = button.querySelector("#btnArrow");
    const sizeDecoration = button.querySelector("#sizeDecoration");

    // Certifique-se de que os elementos começam com os estilos iniciais
    expect(decoration).toHaveClass("w-[0%]");
    expect(sizeDecoration).toHaveClass("w-[0%]");
    expect(arrow).toHaveClass("hidden");

    // Simule o mouse entrando no botão
    fireEvent.mouseEnter(button);

    // Verifique se as classes mudaram corretamente
    expect(decoration).toHaveClass("w-[15%]");
    expect(sizeDecoration).toHaveClass("w-[15%]");
    expect(arrow).toHaveClass("w-4 h-4 visible");
  });

  it("reverts styles on mouse leave", () => {
    render(<ButtonLogin {...props} />);
    const button = screen.getByRole("button", { name: "Login" });
    const decoration = button.querySelector("#decorationBtnLogin");
    const arrow = button.querySelector("#btnArrow");
    const sizeDecoration = button.querySelector("#sizeDecoration");

    // Simule o mouse entrando e saindo do botão
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    // Verifique se os estilos voltaram ao estado inicial
    expect(decoration).toHaveClass("w-[0%]");
    expect(sizeDecoration).toHaveClass("w-[0%]");
    expect(arrow).toHaveClass("hidden");
  });
});
