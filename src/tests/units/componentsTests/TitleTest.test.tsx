import { render, screen } from "@testing-library/react";
import Title from "./../../../app/_components/AuthForms/Title/Title";
import "@testing-library/jest-dom"; // Para matchers como `toBeInTheDocument`

describe("Title component", () => {
  it("should render the title with the provided text", () => {
    // Texto de exemplo para teste
    const text = "Test Title";

    // Renderiza o componente com o texto fornecido
    render(<Title text={text} />);

    // Verifica se o texto aparece corretamente
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(text);
  });

  it("should apply the correct CSS classes", () => {
    // Texto de exemplo para teste
    const text = "Styled Title";

    // Renderiza o componente
    render(<Title text={text} />);

    // Verifica se o título contém as classes CSS esperadas
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveClass(
      "sm:text-[2.5rem]",
      "text-[2rem]",
      "font-medium",
      "text-black"
    );
  });
});
