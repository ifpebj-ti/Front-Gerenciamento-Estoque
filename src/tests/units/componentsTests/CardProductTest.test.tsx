import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardProduct from "./../../../app/_components/Stock/CardProduct";

describe("CardProduct Component", () => {
  const productData = {
    imageUrl: "https://example.com/image.jpg",
    title: "Sample Product",
    disponible: true,
  };

  const clickMock = jest.fn();

  beforeEach(() => {
    clickMock.mockClear();
  });

  it("renders the product title", () => {
    render(<CardProduct data={productData} click={clickMock} />);
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
  });

  it('displays "Disponível" when available', () => {
    render(
      <CardProduct
        data={{ ...productData, disponible: true }}
        click={clickMock}
      />
    );
    expect(screen.getByText("Disponível")).toBeInTheDocument();
  });

  it('displays "Indisponível" when not available', () => {
    render(
      <CardProduct
        data={{ ...productData, disponible: false }}
        click={clickMock}
      />
    );
    expect(screen.getByText("Indisponível")).toBeInTheDocument();
  });

  it("calls the click function when the component is clicked", () => {
    const { container } = render(
      <CardProduct data={productData} click={clickMock} />
    );
    // Como o onClick está no div raiz, usamos o primeiro elemento renderizado
    fireEvent.click(container.firstChild as HTMLElement);
    expect(clickMock).toHaveBeenCalledTimes(1);
  });

  it("sets the correct background image style", () => {
    const { container } = render(
      <CardProduct data={productData} click={clickMock} />
    );
    // Seleciona o div que tem o style definido (imagem de fundo)
    const backgroundDiv = container.querySelector("div[style]");
    expect(backgroundDiv).toHaveStyle(
      `background-image: url(${productData.imageUrl})`
    );
  });
});
