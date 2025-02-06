// Pagination.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "@/app/_components/Stock/Pagination";

describe("Pagination Component", () => {
  test("não renderiza a navegação se totalPages for 1", () => {
    render(<Pagination totalPages={1} sendCurrentPage={jest.fn()} />);
    // O componente só renderiza a <nav> se totalPages > 1
    expect(screen.queryByLabelText("Page navigation")).not.toBeInTheDocument();
  });

  test("renderiza corretamente 5 números de página quando totalPages é maior ou igual a 5", () => {
    render(<Pagination totalPages={10} sendCurrentPage={jest.fn()} />);
    // O componente renderiza os números de página dentro de um <ul>
    const pageItems = screen.getAllByRole("listitem");
    expect(pageItems).toHaveLength(5);
    // Verifica que os números iniciais (1 a 5) estão presentes
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("renderiza corretamente o número de páginas quando totalPages é menor que 5", () => {
    render(<Pagination totalPages={3} sendCurrentPage={jest.fn()} />);
    const pageItems = screen.getAllByRole("listitem");
    expect(pageItems).toHaveLength(3);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("ao clicar em um número de página, chama sendCurrentPage e destaca a página atual", () => {
    const sendCurrentPage = jest.fn();
    render(<Pagination totalPages={10} sendCurrentPage={sendCurrentPage} />);
    const page3 = screen.getByText("3");
    fireEvent.click(page3);
    expect(sendCurrentPage).toHaveBeenCalledWith(3);
    // O botão clicado deve ter a classe que indica página ativa (no nosso caso, "bg-[var(--color-primary)]")
    expect(page3).toHaveClass("bg-[var(--color-primary)]");
  });

  test("não renderiza a seta 'anterior' quando currentPage é 1", () => {
    const { container } = render(
      <Pagination totalPages={10} sendCurrentPage={jest.fn()} />
    );
    const nav = container.querySelector("nav");
    // Quando currentPage é 1, o componente não renderiza a seta anterior, apenas a seta 'próximo'
    // Assim, dentro de <nav>, deve haver somente 1 elemento <div> (a seta 'próximo')
    const arrowDivs = nav?.querySelectorAll("div");
    expect(arrowDivs?.length).toBe(1);
  });

  test("ao clicar na seta 'próximo', chama sendCurrentPage com currentPage + 1", () => {
    const sendCurrentPage = jest.fn();
    // Estado inicial: currentPage = 1; apenas a seta 'próximo' é renderizada
    const { container } = render(
      <Pagination totalPages={10} sendCurrentPage={sendCurrentPage} />
    );
    const nav = container.querySelector("nav");
    const arrowDivs = nav?.querySelectorAll("div");
    // Como currentPage == 1, somente a seta 'próximo' é renderizada (primeiro elemento da <nav>)
    const nextArrow = arrowDivs ? arrowDivs[0] : null;
    expect(nextArrow).toBeInTheDocument();
    fireEvent.click(nextArrow!);
    expect(sendCurrentPage).toHaveBeenCalledWith(2);
  });

  test("ao clicar na seta 'anterior', chama sendCurrentPage com currentPage - 1", () => {
    const sendCurrentPage = jest.fn();
    // Render com totalPages = 10 e simula clique para mudar para uma página diferente (ex.: página 3)
    const { container } = render(
      <Pagination totalPages={10} sendCurrentPage={sendCurrentPage} />
    );
    const page3 = screen.getByText("3");
    fireEvent.click(page3);
    // Agora, currentPage é 3, então ambas as setas devem ser renderizadas
    const nav = container.querySelector("nav");
    const arrowDivs = nav?.querySelectorAll("div");
    // A seta 'anterior' é renderizada como o primeiro <div> dentro da <nav>
    expect(arrowDivs?.length).toBe(2);
    const prevArrow = arrowDivs ? arrowDivs[0] : null;
    expect(prevArrow).toBeInTheDocument();
    fireEvent.click(prevArrow!);
    expect(sendCurrentPage).toHaveBeenCalledWith(2);
  });

  test("não renderiza a seta 'próximo' quando currentPage é igual a totalPages", () => {
    const sendCurrentPage = jest.fn();
    // Use totalPages igual a 5. Após clicar na página 5, currentPage === totalPages
    const { container } = render(
      <Pagination totalPages={5} sendCurrentPage={sendCurrentPage} />
    );
    const page5 = screen.getByText("5");
    fireEvent.click(page5);
    const nav = container.querySelector("nav");
    const arrowDivs = nav?.querySelectorAll("div");
    // Quando currentPage é igual a totalPages, apenas a seta 'anterior' deve ser renderizada
    expect(arrowDivs?.length).toBe(1);
  });
});
