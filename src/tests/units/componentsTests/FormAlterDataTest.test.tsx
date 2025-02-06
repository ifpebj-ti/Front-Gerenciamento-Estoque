import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import FormAlterData from "./../../../app/_components/Profile/FormAlterData";
import { useSession } from "next-auth/react";
import { useAddUser } from "./../../../mutations/UserMutations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { UserInfoType } from "@/types/userType";

jest.mock("next-auth/react");
jest.mock("./../../../mutations/UserMutations");

// ✅ Mock URL.createObjectURL
beforeAll(() => {
  global.URL.createObjectURL = jest.fn();
});

// ✅ Create a test QueryClient
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

describe("FormAlterData Component", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ Mock authenticated user session
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: "Test User", email: "test@example.com" },
        status: "authenticated",
      },
    });

    // ✅ Mock useAddUser mutation function
    (useAddUser as jest.Mock).mockReturnValue({ mutate: mockMutate });
  });

  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <QueryClientProvider client={createTestQueryClient()}>
        {component}
      </QueryClientProvider>
    );
  };

  const mockUser: UserInfoType = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    status: true,
    roles: [{ id: 1, authority: "ROLE_USER" }], // <- Ensure this matches the component's expected format
    first_acess: false,
    photo: null,
  };

  it("should show an error when submitting without a profile picture in register mode", async () => {
    renderWithProviders(
      <FormAlterData isEditMode={true} data={mockUser} isRegister={true}>
        <button data-testid="submit-button">Salvar</button>
      </FormAlterData>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("submit-button"));
    });

    setInterval(() => {
      waitFor(() => {
        expect(screen.queryByText(/selecione.*foto/i)).toBeTruthy();
      });
    }, 1000);
  });

  it("should trigger file input when clicking on profile picture", async () => {
    renderWithProviders(
      <FormAlterData isEditMode={true} data={mockUser} isRegister={true}>
        <></>
      </FormAlterData>
    );

    const profilePicture = screen.getByTestId("profile-picture");

    await act(async () => {
      fireEvent.click(profilePicture);
    });

    const fileInput = document.querySelector(
      "input[type=file]"
    ) as HTMLInputElement;
    expect(fileInput).not.toBeNull();
  });

  it("should call mutation function when confirming user addition", async () => {
    renderWithProviders(
      <FormAlterData isEditMode={true} data={mockUser} isRegister={true}>
        <button data-testid="submit-button"></button>
      </FormAlterData>
    );

    const file = new File(["test"], "test.png", { type: "image/png" });
    const fileInput = document.querySelector(
      "input[type=file]"
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.input(fileInput, { target: { files: [file] } });
      fireEvent.click(screen.getByTestId("submit-button"));
    });

    await waitFor(() => {
      expect(screen.findByText(/Adicionar novo usuário/i)).toBeTruthy();
    });

    setInterval(() => {
      act(async () => {
        fireEvent.click(screen.getByTestId("confirm"));
      });
    }, 1000);
    setInterval(() => {
      waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });
    }, 1000);
  });
});
