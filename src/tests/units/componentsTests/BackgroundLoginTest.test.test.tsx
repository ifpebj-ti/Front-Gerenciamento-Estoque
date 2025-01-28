import { render, screen } from "@testing-library/react";
import BackgroundLogin from "./../../../app/_components/AuthForms/BackgroundLogin/BackgroundLogin";
import "@testing-library/jest-dom"; // Para matchers como `toBeInTheDocument`
/* eslint-disable */
// Mock do módulo `next/image`
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("BackgroundLogin Component", () => {
  it("should render the component without crashing", () => {
    render(<BackgroundLogin />);
    expect(
      screen.getByText(/gerenciador de estoque e pedidos/i)
    ).toBeInTheDocument();
  });

  it("should display the correct title", () => {
    render(<BackgroundLogin />);
    const title = screen.getByText(/gerenciador de estoque e pedidos/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-[3rem]", "font-bold");
  });

  it("should display the correct subtitle", () => {
    render(<BackgroundLogin />);
    const subtitle = screen.getByText(
      /agilidade e precisão no seu estoque e pedidos/i
    );
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass(
      "text-lg",
      "text-[var(--text-color-secondary)]",
      "my-6"
    );
  });

  it("should render the background image with the correct alt text", () => {
    render(<BackgroundLogin />);
    const image = screen.getByAltText(/imagem da tela de login/i);
    expect(image).toBeInTheDocument();
  });

  it("should have the correct layout classes", () => {
    render(<BackgroundLogin />);
    const container = screen.getByRole("img").parentElement?.parentElement;
    expect(container).toHaveClass(
      "hidden",
      "backgroundLoginPoint:flex",
      "h-[38rem]",
      "w-[33rem]"
    );
  });
});
