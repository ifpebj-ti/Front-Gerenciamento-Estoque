import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./../../../app/_components/Header/Header";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";

// Mock para o módulo `next-auth/react`
jest.mock("next-auth/react", () => ({
  __esModule: true,
  useSession: jest.fn(),
}));

// Mock para o componente ProfileCard
jest.mock("./../../../app/_components/ProfileCard/ProfileCard", () => ({
  __esModule: true,
  default: () => <div data-testid="profile-card">Profile Card</div>,
}));

// Mock para o componente WindowLoad
jest.mock("./../../../app/_components/WindowLoad/WindowLoad", () => ({
  __esModule: true,
  default: () => <div data-testid="window-load">Loading...</div>,
}));

describe("Header Component", () => {
  it("should display the loading window if session is not available", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<Header />);

    expect(screen.getByTestId("window-load")).toBeInTheDocument();
    expect(screen.queryByTestId("profile-card")).not.toBeInTheDocument();
  });

  it("should render header elements when session is available", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        userInfo: {
          name: "Test User",
          photo: "test-photo-url",
          email: "test@example.com",
          roles: [],
        },
      },
    });

    render(<Header />);

    expect(screen.getByTestId("profile-card")).toBeInTheDocument();

    const homeLinks = screen.getAllByText(/home/i); // Todos os links "Home"
    expect(homeLinks).toHaveLength(2); // Deve haver 2 (um para o menu mobile e outro para o menu desktop)

    const estoqueLinks = screen.getAllByText(/estoque/i);
    expect(estoqueLinks).toHaveLength(2); // Deve haver 2 também
  });

  it("should display the 'Administração' link if the user has an admin role", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        userInfo: {
          name: "Admin User",
          photo: "admin-photo-url",
          email: "admin@example.com",
          roles: [{ authority: "ROLE_ADMIN" }],
        },
      },
    });

    render(<Header />);

    const adminLinks = screen.getAllByText(/administração/i);
    expect(adminLinks).toHaveLength(2); // Deve haver 2 links "Administração"
  });

  it("should highlight the active link based on the current route", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        userInfo: {
          name: "Test User",
          photo: "test-photo-url",
          email: "test@example.com",
          roles: [],
        },
      },
    });

    // Mock para a localização da rota
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/stock",
      },
      writable: true,
    });

    render(<Header />);

    const stockLinks = screen.getAllByText(/estoque/i);
    expect(stockLinks[1]).toHaveClass("font-extrabold text-white"); // O link do menu desktop deve estar destacado

    const homeLinks = screen.getAllByText(/home/i);
    expect(homeLinks[1]).not.toHaveClass("font-extrabold text-white"); // O link "Home" não deve estar destacado
  });
});
