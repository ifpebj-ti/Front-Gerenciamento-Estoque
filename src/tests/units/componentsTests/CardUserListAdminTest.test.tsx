import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CardUserListAdmin from "./../../../app/_components/Admin/CardUserListAdmin";
import { useSession } from "next-auth/react";
import {
  useActivateUser,
  useDeactivateUser,
} from "./../../../mutations/UserMutations";
import React from "react";
import { UserInfoType } from "@/types/userType";

jest.mock("next-auth/react");
jest.mock("./../../../mutations/UserMutations");

describe("CardUserListAdmin Component", () => {
  const mockUserActive: UserInfoType = {
    id: 1,
    first_acess: true,
    roles: [{ id: 1, authority: "ROLE_USER" }],
    name: "John Doe",
    email: "johndoe@example.com",
    photo: null,
    status: true,
  };

  const mockUserInactive = {
    ...mockUserActive,
    status: false,
  };

  const mockSession = {
    data: { accessToken: "fake-token" },
  };

  const mockActivateUser = {
    mutate: jest.fn(),
  };

  const mockDeactivateUser = {
    mutate: jest.fn(),
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    (useActivateUser as jest.Mock).mockReturnValue(mockActivateUser);
    (useDeactivateUser as jest.Mock).mockReturnValue(mockDeactivateUser);
  });

  it("should render correctly with user data", () => {
    render(
      <CardUserListAdmin data={mockUserActive} sendOpenEditWindow={jest.fn()} />
    );

    expect(screen.getByText("Nome:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
  });

  it("should display the correct button text based on user status", () => {
    render(
      <CardUserListAdmin data={mockUserActive} sendOpenEditWindow={jest.fn()} />
    );
    expect(screen.getByText("Desativar")).toBeInTheDocument();

    render(
      <CardUserListAdmin
        data={mockUserInactive}
        sendOpenEditWindow={jest.fn()}
      />
    );
    expect(screen.getByText("Ativar")).toBeInTheDocument();
  });

  it("should open the edit modal when clicking 'Edit'", () => {
    const mockEditFunction = jest.fn();
    render(
      <CardUserListAdmin
        data={mockUserActive}
        sendOpenEditWindow={mockEditFunction}
      />
    );

    fireEvent.click(screen.getByText(/editar/i));

    expect(mockEditFunction).toHaveBeenCalled();
  });

  it("should close the confirmation modal when clicking 'Cancel'", async () => {
    render(
      <CardUserListAdmin data={mockUserActive} sendOpenEditWindow={jest.fn()} />
    );
    fireEvent.click(screen.getByText("Desativar"));

    fireEvent.click(screen.getByText(/cancelar/i));

    await waitFor(() => {
      expect(screen.queryByText("Desativar Usuário")).not.toBeInTheDocument();
    });
  });

  it("should call the deactivate function when confirming deactivation", async () => {
    const refetchMock = jest.fn();
    render(
      <CardUserListAdmin
        data={mockUserActive}
        sendOpenEditWindow={jest.fn()}
        isRefetch={refetchMock}
      />
    );

    fireEvent.click(screen.getByText("Desativar"));
    fireEvent.click(screen.getByText(/confirmar/i));

    await waitFor(() => {
      expect(mockDeactivateUser.mutate).toHaveBeenCalledWith(
        { token: "fake-token", id: 1 },
        expect.any(Object)
      );
    });
  });

  it("should call the activate function when confirming activation", async () => {
    render(
      <CardUserListAdmin
        data={mockUserInactive}
        sendOpenEditWindow={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Ativar"));
    fireEvent.click(screen.getByText(/confirmar/i));

    await waitFor(() => {
      expect(mockActivateUser.mutate).toHaveBeenCalledWith(
        { token: "fake-token", id: 1 },
        expect.any(Object)
      );
    });
  });

  it("should display an error message if activation fails", async () => {
    mockActivateUser.mutate.mockImplementation((_, { onError }) =>
      onError({ message: "Activation error" })
    );

    render(
      <CardUserListAdmin
        data={mockUserInactive}
        sendOpenEditWindow={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Ativar"));
    fireEvent.click(screen.getByText(/confirmar/i));

    await waitFor(() => {
      expect(screen.getByText("Activation error")).toBeInTheDocument();
    });
  });

  it("should display an error message if deactivation fails", async () => {
    mockDeactivateUser.mutate.mockImplementation((_, { onError }) =>
      onError({ message: "Deactivation error" })
    );

    render(
      <CardUserListAdmin data={mockUserActive} sendOpenEditWindow={jest.fn()} />
    );

    fireEvent.click(screen.getByText("Desativar"));
    fireEvent.click(screen.getByText(/confirmar/i));

    await waitFor(() => {
      expect(screen.getByText("Deactivation error")).toBeInTheDocument();
    });
  });
});
