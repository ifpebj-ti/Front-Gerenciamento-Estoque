function formatMoney(valor: string): string {
  if (valor === undefined) return "R$ 0,00";
  // Remove caracteres não numéricos (exceto vírgula e ponto) e converte para número
  const numero = parseFloat(valor.replace(/[^\d,.-]/g, "").replace(",", "."));

  // Verifica se o número é válido
  if (isNaN(numero)) {
    return "R$ 0,00"; // Retorno padrão para valores inválidos
  }

  // Formata o número como moeda brasileira
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default formatMoney;
