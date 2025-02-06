// ViewProduct.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewProduct from "@/app/_components/Stock/ViewProduct";

describe("ViewProduct Component", () => {
  const sampleData = {
    image: "https://example.com/image.png",
    title: "Product Title",
    unit_price: "100",
    stock_value: "200",
    quantity: 10,
    description: "This is a sample product description.",
  };

  test("renderiza os detalhes do produto corretamente quando a imagem é fornecida", () => {
    const closeMock = jest.fn();
    render(<ViewProduct close={closeMock} data={sampleData} />);

    // Verifica se o botão 'VOLTAR' é exibido
    const voltarElement = screen.getByText("VOLTAR");
    expect(voltarElement).toBeInTheDocument();

    // Verifica se o título do produto é exibido
    expect(screen.getByText(sampleData.title)).toBeInTheDocument();

    // Verifica se a descrição é exibida
    expect(screen.getByText(sampleData.description)).toBeInTheDocument();

    // Verifica se os componentes ViewValueProduct renderizam seus títulos
    expect(screen.getByText("Valor unitário")).toBeInTheDocument();
    expect(screen.getByText("Valor estoque")).toBeInTheDocument();
    expect(screen.getByText("Quantidade")).toBeInTheDocument();

    // Verifica se o container da imagem possui o backgroundImage correto
    const imageContainer = document.querySelector(
      "div[style*='background-image']"
    );
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveStyle(
      `background-image: url(${sampleData.image})`
    );
  });

  test("usa imagem de fallback quando data.image é null", () => {
    const closeMock = jest.fn();
    const dataWithoutImage = { ...sampleData, image: null };
    render(<ViewProduct close={closeMock} data={dataWithoutImage} />);

    const imageContainer = document.querySelector(
      "div[style*='background-image']"
    );
    expect(imageContainer).toBeInTheDocument();
    // Verifica se o fallback (https://placehold.co/600x400) é utilizado
    expect(imageContainer).toHaveStyle(
      `background-image: url(https://placehold.co/600x400)`
    );
  });

  test("chama a função close quando o botão 'VOLTAR' é clicado", () => {
    const closeMock = jest.fn();
    render(<ViewProduct close={closeMock} data={sampleData} />);
    const voltarElement = screen.getByText("VOLTAR");
    fireEvent.click(voltarElement);
    expect(closeMock).toHaveBeenCalled();
  });
});
