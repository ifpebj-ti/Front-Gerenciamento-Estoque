import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormLogin from "./../../../app/_components/AuthForms/FormLogin/FormLogin";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock do next-auth/react
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
  signIn: jest.fn(),
}));

// Mock do next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("FormLogin Component", () => {
  const mockSendErrorPassOrEmail = jest.fn();
  const mockSendLoading = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    // Mock do useRouter
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    // Mock do useSession
    (useSession as jest.Mock).mockReturnValue({ data: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with email and password inputs", () => {
    render(
      <FormLogin
        sendErrorPassOrEmail={mockSendErrorPassOrEmail}
        sendLoading={mockSendLoading}
      >
        <button type="submit">Submit</button>
      </FormLogin>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("calls sendLoading and handles successful submission", async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ ok: true, error: null });
    (signIn as jest.Mock).mockImplementation(mockSignIn);

    render(
      <FormLogin
        sendErrorPassOrEmail={mockSendErrorPassOrEmail}
        sendLoading={mockSendLoading}
      >
        <button type="submit">Submit</button>
      </FormLogin>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockSendLoading).toHaveBeenCalledTimes(1);
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        username: "user@example.com",
        password: "password123",
        redirect: false,
      });
      expect(mockRouterPush).toHaveBeenCalledWith("/");
    });
  });

  it("calls sendErrorPassOrEmail on failed submission", async () => {
    const mockSignIn = jest
      .fn()
      .mockResolvedValue({ ok: false, error: "Invalid credentials" });
    (signIn as jest.Mock).mockImplementation(mockSignIn);

    render(
      <FormLogin
        sendErrorPassOrEmail={mockSendErrorPassOrEmail}
        sendLoading={mockSendLoading}
      >
        <button type="submit">Submit</button>
      </FormLogin>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockSendLoading).toHaveBeenCalledTimes(1);
      expect(mockSendErrorPassOrEmail).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });
});
