// CardProduct.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardProduct from "@/app/_components/Stock/CardProduct";

/* eslint-disable */
// --- Mock para o next/image ---
// Faz com que o componente Next Image seja renderizado como uma tag <img> simples.
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("CardProduct Component", () => {
  const sampleData = {
    imageUrl: "https://example.com/image.png",
    title: "Produto de Teste",
    disponible: true,
  };

  test("renderiza corretamente com produto disponível", () => {
    const clickMock = jest.fn();
    render(<CardProduct data={sampleData} click={clickMock} />);

    // Verifica se a imagem é renderizada com o alt "Imagem do produto"
    const image = screen.getByAltText("Imagem do produto");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", sampleData.imageUrl);

    // Verifica se o título é renderizado corretamente
    const titleElement = screen.getByText(sampleData.title);
    expect(titleElement).toBeInTheDocument();

    // Verifica se o status "Disponível" é renderizado com a classe de cor correta
    const statusElement = screen.getByText("Disponível");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("text-[var(--color-primary)]");
  });

  test("renderiza corretamente com produto indisponível", () => {
    const clickMock = jest.fn();
    const unavailableData = { ...sampleData, disponible: false };
    render(<CardProduct data={unavailableData} click={clickMock} />);

    // Verifica se o status "Indisponível" é renderizado com a classe de cor correta
    const statusElement = screen.getByText("Indisponível");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("text-red-500");
  });

  test("chama a função click quando o card é clicado", () => {
    const clickMock = jest.fn();
    render(<CardProduct data={sampleData} click={clickMock} />);

    // Como o componente não possui um test id, usamos o título para encontrar o card
    // e depois subimos até o elemento pai mais próximo (que é o card)
    const cardElement = screen.getByText(sampleData.title).closest("div");
    expect(cardElement).toBeInTheDocument();

    fireEvent.click(cardElement!);
    expect(clickMock).toHaveBeenCalledTimes(1);
  });
});
