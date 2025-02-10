import { render, screen, fireEvent } from "@testing-library/react";
import WindowAddNewUser from "./../../../app/_components/Admin/WindowAddNewUser";
import { useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { UserInfoType } from "@/types/userType";

jest.mock("next-auth/react");

// ✅ Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false }, // Prevent retries to avoid unnecessary errors
    },
  });

describe("WindowAddNewUser Component", () => {
  const mockSendClose = jest.fn();
  /* eslint-disable */
  const mockIsRefetch = jest.fn();

  const mockUser: UserInfoType = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    status: true,
    roles: [{ id: 1, authority: "ROLE_USER" }],
    first_acess: false,
    photo: "test-photo-url",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User" }, status: "authenticated" },
    });
  });

  // ✅ Helper function to wrap with QueryClientProvider
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <QueryClientProvider client={createTestQueryClient()}>
        {component}
      </QueryClientProvider>
    );
  };

  it("should call sendClose function when 'Cancel' button is clicked", () => {
    renderWithProviders(
      <WindowAddNewUser
        sendClose={mockSendClose}
        isAddUser={true}
        data={mockUser}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockSendClose).toHaveBeenCalled();
  });
});
