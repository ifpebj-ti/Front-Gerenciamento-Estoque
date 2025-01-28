import { render, screen, fireEvent } from "@testing-library/react";
import ButtonChangeLogin from "./../../../app/_components/AuthForms/ButtonChangeLogin/ButtonChangeLogin";
import "@testing-library/jest-dom"; // Para matchers como `toBeInTheDocument` e `toHaveClass`

describe("ButtonChangeLogin", () => {
  const mockClick = jest.fn();

  it("should render the button with the provided text", () => {
    render(
      <ButtonChangeLogin
        click={mockClick}
        text="Test Button"
        invertArrow={false}
      />
    );

    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
  });

  it("should call the click function when clicked", () => {
    render(
      <ButtonChangeLogin
        click={mockClick}
        text="Click Me"
        invertArrow={false}
      />
    );

    const button = screen.getByRole("button", { name: /click me/i });

    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("should add the correct CSS classes when `invertArrow` is false", () => {
    render(
      <ButtonChangeLogin
        click={mockClick}
        text="Test Button"
        invertArrow={false}
      />
    );

    const button = screen.getByRole("button", { name: /test button/i });

    // Verifica se a classe para inverter a seta foi aplicada corretamente
    expect(button).toHaveClass("flex-row-reverse");
  });

  it("should not add `flex-row-reverse` class when `invertArrow` is true", () => {
    render(
      <ButtonChangeLogin
        click={mockClick}
        text="Test Button"
        invertArrow={true}
      />
    );

    const button = screen.getByRole("button", { name: /test button/i });

    // Verifica se a classe não está presente
    expect(button).not.toHaveClass("flex-row-reverse");
  });

  it("should handle mouse hover events correctly", () => {
    render(
      <ButtonChangeLogin
        click={mockClick}
        text="Hover Test"
        invertArrow={false}
      />
    );

    const button = screen.getByRole("button", { name: /hover test/i });

    // Simula o evento de mouse enter
    fireEvent.mouseEnter(button);

    expect(button).toHaveClass("animationButtonChangeLogin");

    const svg = button.querySelector("svg");
    expect(svg).toHaveClass("stroke-[#417AFC]");
    expect(svg).not.toHaveClass("stroke-black");

    // Simula o evento de mouse leave
    fireEvent.mouseLeave(button);

    expect(button).not.toHaveClass("animationButtonChangeLogin");
    expect(svg).toHaveClass("stroke-black");
    expect(svg).not.toHaveClass("stroke-[#417AFC]");
  });

  it("should display 'Default' when no text prop is provided", () => {
    render(<ButtonChangeLogin click={mockClick} text="" invertArrow={false} />);

    const button = screen.getByRole("button", { name: /default/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Default");
  });
});
