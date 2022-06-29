const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
const {
  nonexistentProductIdBody2,
  nonexistentProductIdBody,
  wrongZeroNegativeBody,
  rightSaleBody,
  wrongZeroQuantityBody,
  wrongSaleNotQuantityBody,
  wrongSaleNotProductIdBody,
} = require('./_dataMock');
require("dotenv").config();

describe("16 - Crie endpoint para atualizar uma venda", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado que não é possível realizar operações em uma venda sem o campo productId", async () => {
    const { status, json } = await frisby.put(`${url}/sales/1`, wrongSaleNotProductIdBody);

    expect(status).toBe(400);
    expect(json.message).toEqual("\"productId\" is required");
  });

  it("Será validado que não é possível realizar operações em uma venda sem o campo quantity", async () => {
    const { status, json } = await frisby.put(`${url}/sales/1`, wrongSaleNotQuantityBody);

    expect(status).toBe(400);
    expect(json.message).toEqual("\"quantity\" is required");
  });

  it("Será validado que não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0 (Zero), quantidade 0", async () => {
    const { status, json } = await frisby.put(`${url}/sales/1`, wrongZeroQuantityBody);

    expect(status).toBe(422);
    expect(json.message).toEqual("\"quantity\" must be greater than or equal to 1");
  });

  it("Será validado que não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0 (Zero), quantidade negativa", async () => {
    const { status, json } = await frisby.put(`${url}/sales/1`, wrongZeroNegativeBody);

    expect(status).toBe(422);
    expect(json.message).toEqual("\"quantity\" must be greater than or equal to 1");
  });

  it("Será validado que não é possível realizar operações em uma venda com o campo productId inexistente, em um array com uma venda", async () => {
    const { status, json } = await frisby.put(`${url}/sales/1`, nonexistentProductIdBody);

    expect(status).toBe(404);
    expect(json.message).toEqual("Product not found");
  });

  it("Será validado que não é possível realizar operações em uma venda com o campo productId inexistente, em um array com várias vendas", async () => {
    const { status, json } = await frisby.put(`${url}/sales/1`, nonexistentProductIdBody2);

    expect(status).toBe(404);
    expect(json.message).toEqual("Product not found");
  });

  it("Será validado que não é possível alterar uma venda que não existe", async () => {
    const { status, json } = await frisby.put(`${url}/sales/999`, rightSaleBody);

    expect(status).toBe(404);
    expect(json.message).toEqual("Sale not found");
  });

  it("Será validado que é possível alterar uma venda com sucesso", async () => {
    const { status, json } = await frisby.put(`${url}/sales/1`, rightSaleBody);

    expect(status).toBe(200);
    expect(json).toHaveProperty("saleId");
    expect(json).toHaveProperty("itemsUpdated");

    expect(json.itemsUpdated[0]).toHaveProperty("productId");
    expect(json.itemsUpdated[0]).toHaveProperty("quantity");

    expect(json.itemsUpdated[0].productId).toBeDefined();
    expect(json.itemsUpdated[0].quantity).toBeDefined();

    expect(json.itemsUpdated[0].productId).toBe(1);
    expect(json.itemsUpdated[0].quantity).toBe(1);

    expect(json.itemsUpdated[1]).toHaveProperty("productId");
    expect(json.itemsUpdated[1]).toHaveProperty("quantity");

    expect(json.itemsUpdated[1].productId).toBeDefined();
    expect(json.itemsUpdated[1].quantity).toBeDefined();

    expect(json.itemsUpdated[1].productId).toBe(2);
    expect(json.itemsUpdated[1].quantity).toBe(5);
  });

  it("Será validado que a venda foi alterada no banco de dados", async () => {
    const { status, json } = await frisby.get(`${url}/sales/1`);

    expect(status).toBe(200);
    expect(json.length).toBe(2);
  
    expect(json[0].productId).toBe(1);
    expect(json[0].quantity).toBe(1);
    expect(json[1].productId).toBe(2);
    expect(json[1].quantity).toBe(5);
  });
});