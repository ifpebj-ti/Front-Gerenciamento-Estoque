import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CardProductListAdmin from "./../../../app/_components/Admin/CardProductListAdmin";
import { useSession } from "next-auth/react";
import { useDeleteProduct } from "./../../../mutations/ProductMutations";
import React from "react";
import { Product } from "@/types/productType";

jest.mock("next-auth/react");
jest.mock("./../../../mutations/ProductMutations");

describe("CardProductListAdmin", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    critical_quantity: 10,
    description: "Test Description",
    unitValue: 100,
    stockValue: 500,
    quantity: 5,
    photo: null,
    categories: [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ],
  };

  const mockSession = {
    data: { accessToken: "fake-token" },
  };

  const mockDeleteProduct = {
    mutate: jest.fn(),
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    (useDeleteProduct as jest.Mock).mockReturnValue(mockDeleteProduct);
  });

  it("should render correctly with the product data", () => {
    render(
      <CardProductListAdmin data={mockProduct} sendOpenEditWindow={jest.fn()} />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Valor unitário")).toBeInTheDocument();
    expect(screen.getByText("Valor estoque")).toBeInTheDocument();
    expect(screen.getByText("Quantidade")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  it("should open the confirmation modal when clicking 'Delete'", () => {
    render(
      <CardProductListAdmin data={mockProduct} sendOpenEditWindow={jest.fn()} />
    );

    const deleteButton = screen.getByText(/excluir/i);
    fireEvent.click(deleteButton);

    expect(screen.getByText("Excluir produto")).toBeInTheDocument();
    expect(screen.getByText("Deseja excluir o produto?")).toBeInTheDocument();
  });

  it("should close the confirmation modal when clicking 'Cancel'", async () => {
    render(
      <CardProductListAdmin data={mockProduct} sendOpenEditWindow={jest.fn()} />
    );

    fireEvent.click(screen.getByText(/excluir/i));

    const cancelButton = screen.getByText(/cancelar/i);
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText("Excluir produto")).not.toBeInTheDocument();
    });
  });

  it("should call the delete function when confirming deletion", async () => {
    const refetchMock = jest.fn();

    render(
      <CardProductListAdmin
        data={mockProduct}
        sendOpenEditWindow={jest.fn()}
        refetch={refetchMock}
      />
    );

    fireEvent.click(screen.getByText(/excluir/i));
    fireEvent.click(screen.getByText(/confirmar/i));

    await waitFor(() => {
      expect(mockDeleteProduct.mutate).toHaveBeenCalledWith(
        { token: "fake-token", id: 1 },
        expect.any(Object)
      );
    });
  });

  it("should display a success message after successful deletion", async () => {
    mockDeleteProduct.mutate.mockImplementation((_, { onSuccess }) =>
      onSuccess()
    );

    render(
      <CardProductListAdmin
        data={mockProduct}
        sendOpenEditWindow={jest.fn()}
        refetch={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/excluir/i));
    fireEvent.click(screen.getByText(/confirmar/i));

    await waitFor(() => {
      expect(
        screen.getByText("Produto excluido com sucesso")
      ).toBeInTheDocument();
    });
  });

  it("should display an error message if deletion fails", async () => {
    mockDeleteProduct.mutate.mockImplementation((_, { onError }) => onError());

    render(
      <CardProductListAdmin
        data={mockProduct}
        sendOpenEditWindow={jest.fn()}
        refetch={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/excluir/i));
    fireEvent.click(screen.getByText(/confirmar/i));

    await waitFor(() => {
      expect(screen.getByText("Erro ao excluir produto")).toBeInTheDocument();
    });
  });

  it("should open the edit modal when clicking 'Edit'", () => {
    const mockEditFunction = jest.fn();

    render(
      <CardProductListAdmin
        data={mockProduct}
        sendOpenEditWindow={mockEditFunction}
      />
    );

    const editButton = screen.getByText(/editar/i);
    fireEvent.click(editButton);

    expect(mockEditFunction).toHaveBeenCalled();
  });
});
