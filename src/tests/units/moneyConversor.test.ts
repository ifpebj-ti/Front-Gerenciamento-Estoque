import formatMoney from "../../utils/moneyFormat";

describe("By Testing function of convert number to Br coin", () => {
  it("Should return R$ 0,00", () => {
    const format = formatMoney("yky").trim();
    console.log(`Received: "${format}"`); // Log do valor retornado
    expect(format).toEqual("R$ 0,00");
  });
});
