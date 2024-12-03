import ProductType from "@/types/productType";

const products: ProductType[] = [
  {
    id: 3,
    image: "https://placehold.co/600x400",
    title: "KIT FECHADURAS STAM ANTIQUE 2 INTERNAS + 1 PARA BANHEIRO",
    categories: ["kit", "fechaduras", "banheiro"],
    quantity: 50,
    stock_value: "100",
    unit_price: "10000",
    criticalQuantityStock: 20,
    description: "Kit com 2 fechaduras internas e 1 para banheiro",
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVUsms7oB4xz8w1geynBqKleFSF51p7reVg&s",
    title: "FECHADURA DIGITAL INTELIGENTE COM BIOMETRIA",
    categories: ["fechaduras", "digital", "segurança"],
    quantity: 30,
    stock_value: "200",
    unit_price: "15000",
    criticalQuantityStock: 50,
    description: "Fechadura inteligente com biometria",
  },
  {
    id: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVUsms7oB4xz8w1geynBqKleFSF51p7reVg&s",
    title: "FECHADURA SIMPLES PARA PORTA DE MADEIRA",
    categories: ["fechaduras", "simples", "porta"],
    quantity: 100,
    stock_value: "300",
    unit_price: "2000",
    criticalQuantityStock: 60,
    description: "Fechadura simples para porta de madeira",
  },
  {
    id: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVUsms7oB4xz8w1geynBqKleFSF51p7reVg&s",
    title: "TRAVA DE SEGURANÇA PARA PORTA DE AÇO",
    categories: ["travas", "segurança", "porta de aço"],
    quantity: 20,
    stock_value: "50000",
    unit_price: "5000",
    criticalQuantityStock: 70,
    description: "Trava de segurança para porta de aço",
  },
  {
    id: 7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVUsms7oB4xz8w1geynBqKleFSF51p7reVg&s",
    title: "KIT PREMIUM FECHADURAS DE LUXO PARA RESIDÊNCIAS",
    categories: ["kit", "luxo", "fechaduras"],
    quantity: 10,
    stock_value: "500",
    unit_price: "20000",
    criticalQuantityStock: 80,
    description: "Kit premium fechaduras de luxo para residência",
  },
];

export default products;
