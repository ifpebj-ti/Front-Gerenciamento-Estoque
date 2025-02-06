// ProfileCard.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
// Corrija o caminho abaixo conforme a localização do seu componente ProfileCard
import "@testing-library/jest-dom";
import ProfileCard from "@/app/_components/ProfileCard/ProfileCard";

// --- Mocks para componentes do Next.js ---
/* eslint-disable */
// Mock para next/image: renderiza um elemento <img> com os mesmos props.
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock para next/link: renderiza um elemento <a> simples.
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// --- Dados de exemplo ---
const dummyData = {
  name: "Test User",
  avatar: "",
  email: "test@example.com",
};

describe("ProfileCard Component", () => {
  beforeEach(() => {
    // Define um valor padrão para window.innerWidth (desktop)
    window.innerWidth = 1024;
  });

  test("renderiza corretamente com os dados informados", async () => {
    await act(async () => {
      render(<ProfileCard data={dummyData} />);
    });

    // Verifica se a imagem do avatar é renderizada com o alt "foto"
    const avatarImage = await screen.findByAltText("foto");
    expect(avatarImage).toBeInTheDocument();
    // Como data.avatar está vazio, espera-se que a imagem utilize o placeholder
    expect(avatarImage).toHaveAttribute("src", "https://placehold.co/600x400");

    // Verifica se o nome é renderizado corretamente
    const nameElement = await screen.findByText(dummyData.name);
    expect(nameElement).toBeInTheDocument();

    // Verifica se o ícone do profile (com alt definido) está presente
    const profileIcon = await screen.findByAltText(
      "Ícone para abrir ou fechar header"
    );
    expect(profileIcon).toBeInTheDocument();

    // Verifica se o menu de opções existe e está oculto (possui a classe "hidden")
    const options = document.getElementById("options");
    expect(options).toBeInTheDocument();
    expect(options).toHaveClass("hidden");
  });

  test("alterna o menu ao clicar quando a largura da tela é <= 768", async () => {
    // Simula um ambiente mobile definindo a largura da tela
    window.innerWidth = 600;
    await act(async () => {
      render(<ProfileCard data={dummyData} />);
    });

    const profileCard = document.getElementById("profile-card");
    expect(profileCard).toBeInTheDocument();

    const profileIcon = profileCard?.querySelector("#profile-icon");
    const options = profileCard?.querySelector("#options");

    // Estado inicial: ícone sem a classe "rotate-180" e menu oculto
    expect(profileIcon?.classList.contains("rotate-180")).toBe(false);
    expect(options?.classList.contains("hidden")).toBe(true);

    // Abre o menu com clique
    await act(async () => {
      fireEvent.click(profileCard!);
    });
    expect(profileIcon?.classList.contains("rotate-180")).toBe(true);
    expect(options?.classList.contains("hidden")).toBe(false);
    expect(options?.classList.contains("flex")).toBe(true);
    expect(options?.classList.contains("py-2")).toBe(true);

    // Fecha o menu com novo clique
    await act(async () => {
      fireEvent.click(profileCard!);
    });
    expect(profileIcon?.classList.contains("rotate-180")).toBe(false);
    expect(options?.classList.contains("hidden")).toBe(true);
    expect(options?.classList.contains("py-0")).toBe(true);
  });

  test("alterna o menu com eventos de mouse em telas com largura >= 768", async () => {
    // Define um ambiente desktop
    window.innerWidth = 1024;
    await act(async () => {
      render(<ProfileCard data={dummyData} />);
    });

    const profileCard = document.getElementById("profile-card");
    expect(profileCard).toBeInTheDocument();

    const profileIcon = profileCard?.querySelector("#profile-icon");
    const options = profileCard?.querySelector("#options");

    // Estado inicial: menu fechado.
    expect(profileIcon?.classList.contains("rotate-180")).toBe(false);
    expect(options?.classList.contains("hidden")).toBe(true);

    // Simula o mouse enter para abrir o menu.
    await act(async () => {
      fireEvent.mouseEnter(profileCard!);
    });
    expect(profileIcon?.classList.contains("rotate-180")).toBe(true);
    expect(options?.classList.contains("hidden")).toBe(false);
    expect(options?.classList.contains("flex")).toBe(true);
    expect(options?.classList.contains("py-2")).toBe(true);

    // Simula o mouse leave para fechar o menu.
    await act(async () => {
      fireEvent.mouseLeave(profileCard!);
    });
    expect(profileIcon?.classList.contains("rotate-180")).toBe(false);
    expect(options?.classList.contains("hidden")).toBe(true);
    expect(options?.classList.contains("py-0")).toBe(true);
  });

  test("trunca o nome caso ultrapasse 12 caracteres", async () => {
    const longNameData = {
      ...dummyData,
      name: "VeryLongUserNameExceedingLimit",
    };

    await act(async () => {
      render(<ProfileCard data={longNameData} />);
    });
    // O nome exibido deve conter os 12 primeiros caracteres + "..."
    const expectedName = longNameData.name.slice(0, 12) + "...";
    const nameElement = await screen.findByText(expectedName);
    expect(nameElement).toBeInTheDocument();
  });

  test("trunca o email caso ultrapasse 19 caracteres", async () => {
    const longEmailData = {
      ...dummyData,
      email: "averylongemailaddress@example.com",
    };

    // Configura o ambiente mobile
    window.innerWidth = 600;
    await act(async () => {
      render(<ProfileCard data={longEmailData} />);
    });

    const profileCard = document.getElementById("profile-card");
    expect(profileCard).toBeInTheDocument();

    // Abre o menu de opções via clique
    await act(async () => {
      fireEvent.click(profileCard!);
    });

    // O email exibido deve ser truncado para os 19 primeiros caracteres + "..."
    const expectedEmail = longEmailData.email.slice(0, 19) + "...";
    const emailElement = await screen.findByText(expectedEmail);
    expect(emailElement).toBeInTheDocument();
  });
});
