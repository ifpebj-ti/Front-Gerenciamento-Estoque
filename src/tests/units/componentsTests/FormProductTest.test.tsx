// FormProduct.test.tsx
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";

// ======================================================================
// 1. Definindo global.URL.createObjectURL (JSDOM não a implementa)
global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/fakeblob");

// ======================================================================
// 2. Mock para next/image (removendo a prop objectFit para não gerar warning)
/* eslint-disable */
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { objectFit, ...rest } = props;
    return <img {...rest} />;
  },
}));

// ======================================================================
// 3. Mocks para componentes filhos
jest.mock("./../../../app/_components/WindowLoad/WindowLoad", () => () => (
  <div data-testid="window-load">WindowLoad</div>
));
jest.mock(
  "./../../../app/_components/WindowSuccess/WindowSuccess",
  () =>
    ({ sendClose, text }: { sendClose: () => void; text: string }) =>
      <div data-testid="window-success">{text}</div>
);
jest.mock(
  "./../../../app/_components/WindowConfirm/WindowConfirm",
  () =>
    ({
      confirm,
      sendClose,
      title,
      message,
    }: {
      confirm: () => void;
      sendClose: () => void;
      title: string;
      message: string;
    }) =>
      (
        <div data-testid="window-confirm">
          {title} - {message}
          <button onClick={confirm}>Confirm</button>
        </div>
      )
);
jest.mock(
  "./../../../app/_components/WindowError/WindowError",
  () =>
    ({ sendClose, text }: { sendClose: () => void; text: string }) =>
      <div data-testid="window-error">{text}</div>
);
jest.mock(
  "./../../../app/_components/Stock/WindowAddNewCategory.tsx",
  () =>
    ({ sendClose }: { sendClose: () => void }) =>
      <div data-testid="window-add-new-category">WindowAddNewCategory</div>
);

// ======================================================================
// 4. Mocks para hooks externos
import { useSession } from "next-auth/react";
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

import { useGetCategories } from "./../../../queries/CategoriesQueries";
jest.mock("./../../../queries/CategoriesQueries", () => ({
  useGetCategories: jest.fn(),
}));

import { useGetProduct } from "./../../../queries/ProductsQueries";
jest.mock("./../../../queries/ProductsQueries", () => ({
  useGetProduct: jest.fn(),
}));

import {
  useAddProduct,
  useUpdateProduct,
} from "./../../../mutations/ProductMutations";
import FormProduct from "@/app/_components/Stock/FormProduct";
jest.mock("./../../../mutations/ProductMutations", () => ({
  useAddProduct: jest.fn(),
  useUpdateProduct: jest.fn(),
}));

// ======================================================================
// 5. Configuração dos mocks padrão
const mockSession = { data: { accessToken: "fake-token" } };
(useSession as jest.Mock).mockReturnValue(mockSession);

// Para os testes de FormProduct, vamos fornecer uma categoria válida:
const fakeCategories = [{ id: 1, name: "Test Category" }];
(useGetCategories as jest.Mock).mockReturnValue({ data: fakeCategories });

// Por padrão, para o modo edição, a query de produto retorna { isLoading: false, data: null }
(useGetProduct as jest.Mock).mockReturnValue({ isLoading: false, data: null });

// Mutações: funções mutate (mockadas) e isPending como false
const mutateAddProduct = jest.fn();
(useAddProduct as jest.Mock).mockReturnValue({
  mutate: mutateAddProduct,
  isPending: false,
});

const mutateUpdateProduct = jest.fn();
(useUpdateProduct as jest.Mock).mockReturnValue({
  mutate: mutateUpdateProduct,
});

// ======================================================================
// 6. Helper para renderizar o componente com um botão de submit
const renderFormProduct = (
  props: Partial<React.ComponentProps<typeof FormProduct>> = {}
) => {
  return render(
    <FormProduct sendClose={jest.fn()} {...props}>
      <button type="submit">Submit</button>
    </FormProduct>
  );
};

// ======================================================================
// 7. Testes
describe("FormProduct Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Para cada teste, garantimos que temos a categoria "Test Category"
    (useGetCategories as jest.Mock).mockReturnValue({ data: fakeCategories });
  });

  test("renderiza os campos do formulário corretamente", () => {
    renderFormProduct({ isEdit: false });

    // Verifica se o input "Nome do Produto" está na tela
    expect(screen.getByPlaceholderText("Nome do Produto")).toBeInTheDocument();
    // Verifica a textarea de "Descrição"
    expect(screen.getByPlaceholderText("Descrição")).toBeInTheDocument();
    // Verifica o botão "Selecionar Imagem"
    expect(screen.getByText("Selecionar Imagem")).toBeInTheDocument();
    // Verifica o botão "Adicionar nova categoria"
    expect(screen.getByText("Adicionar nova categoria")).toBeInTheDocument();
  });

  test("ao submeter sem imagem (modo adicionar) exibe WindowError", async () => {
    const { container } = renderFormProduct({ isEdit: false });

    // Preenche os campos obrigatórios:
    fireEvent.change(screen.getByPlaceholderText("Nome do Produto"), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText("Quantidade"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByPlaceholderText("Estoque critico"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText("Descrição"), {
      target: { value: "Test description" },
    });
    // Preenche o campo unit_price usando o input com name="unit_price"
    const priceInput = container.querySelector(
      "input[name='unit_price']"
    ) as HTMLInputElement;
    fireEvent.change(priceInput, { target: { value: "1000" } });

    // Simula a seleção de uma categoria: clique no checkbox da "Test Category"
    const categoryCheckbox = screen.getByLabelText(
      "Test Category"
    ) as HTMLInputElement;
    fireEvent.click(categoryCheckbox);

    // Submete o formulário
    const form = container.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    // Aguarda que WindowError seja renderizado com a mensagem esperada
    await waitFor(() => {
      expect(screen.getByTestId("window-error")).toBeInTheDocument();
      expect(screen.getByTestId("window-error")).toHaveTextContent(
        "Selecione uma foto para o produto"
      );
    });
  });

  test("ao submeter com dados válidos (modo adicionar) exibe WindowConfirm", async () => {
    const { container } = renderFormProduct({ isEdit: false });

    // Preenche os campos obrigatórios
    fireEvent.change(screen.getByPlaceholderText("Nome do Produto"), {
      target: { value: "Valid Product" },
    });
    fireEvent.change(screen.getByPlaceholderText("Quantidade"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByPlaceholderText("Estoque critico"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Descrição"), {
      target: { value: "A valid description" },
    });
    // Preenche o campo unit_price
    const priceInput = container.querySelector(
      "input[name='unit_price']"
    ) as HTMLInputElement;
    fireEvent.change(priceInput, { target: { value: "1000" } });

    // Simula a seleção de uma categoria
    const categoryCheckbox = screen.getByLabelText(
      "Test Category"
    ) as HTMLInputElement;
    fireEvent.click(categoryCheckbox);

    // Simula a seleção de imagem:
    // Clica no botão "Selecionar Imagem" (que dispara o clique no input hidden)
    const selectImageButton = screen.getByText("Selecionar Imagem");
    fireEvent.click(selectImageButton);
    // Obtém o input de arquivo pelo id "image"
    const imageInput = container.querySelector(
      "input#image"
    ) as HTMLInputElement;
    // Cria um arquivo simulado (do tipo PNG e tamanho menor que 5MB)
    const file = new File(["dummy content"], "test.png", {
      type: "image/png",
      size: 1024,
    });
    fireEvent.change(imageInput, { target: { files: [file] } });
    // Aguarda que a pré-visualização da imagem seja renderizada (usando o id "imagePreview")
    await waitFor(() => {
      expect(document.getElementById("imagePreview")).toBeInTheDocument();
    });

    // Submete o formulário
    const form = container.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    // Aguarda que WindowConfirm seja renderizado
    await waitFor(() => {
      expect(screen.getByTestId("window-confirm")).toBeInTheDocument();
      expect(screen.getByText("Confirm")).toBeInTheDocument();
    });
  });

  test("em modo de edição, inicializa os campos com os dados do produto", async () => {
    // Mocka useGetProduct para simular dados de produto já cadastrados
    const productData = {
      id: 1,
      name: "Existing Product",
      unitValue: 200,
      critical_quantity: 5,
      quantity: 10,
      description: "Existing product description",
      categories: [{ id: 1, name: "Category 1" }],
      photo: "base64ImageData", // A função base64ToBlob usará esses dados
      stockValue: 50,
    };
    (useGetProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: productData,
    });

    // Descomente ou adicione a renderização do componente em modo de edição:
    const { container } = renderFormProduct({ isEdit: true, idProduct: 1 });

    // Aguarda que o useEffect de inicialização preencha os campos
    await waitFor(() => {
      expect(screen.getByDisplayValue("Existing Product")).toBeInTheDocument();
      expect(screen.getByDisplayValue("200")).toBeInTheDocument();
      expect(screen.getByDisplayValue("10")).toBeInTheDocument();
      expect(screen.getByDisplayValue("5")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Descrição")).toHaveValue(
        "Existing product description"
      );
    });
  });
});
