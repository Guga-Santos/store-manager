require("dotenv").config();
const frisby = require("frisby");
const { runSeed, connect } = require('./_utils');
const { 
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  rightSaleBody,
  saleCreateResponse,
} = require('./_dataMock');

describe("06 - Crie endpoint para validar e cadastrar vendas", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado que não é possível realizar operações em uma venda sem o campo productId", async () => {
    const { status, json } = await frisby.post(`${url}/sales`, wrongSaleNotProductIdBody);

    expect(status).toBe(400);
    expect(json.message).toEqual("\"productId\" is required");
  });

  it("Será validado que não é possível realizar operações em uma venda sem o campo quantity", async () => {
    const { status, json } = await frisby.post(`${url}/sales`, wrongSaleNotQuantityBody);

    expect(status).toBe(400);
    expect(json.message).toEqual("\"quantity\" is required");
  });

  it("Será validado que não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0 (Zero), quantidade 0", async () => {
    const { status, json } = await frisby.post(`${url}/sales`, wrongZeroQuantityBody);

    expect(status).toBe(422);
    expect(json.message).toEqual("\"quantity\" must be greater than or equal to 1");
  });

  it("Será validado que não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0 (Zero), quantidade negativa", async () => {
    const { status, json } = await frisby.post(`${url}/sales`, wrongZeroNegativeBody);

    expect(status).toBe(422);
    expect(json.message).toEqual("\"quantity\" must be greater than or equal to 1");
  });

  it("Será validado que não é possível realizar operações em uma venda com o campo `productId` inexistente, em uma requisição com um único item", async () => {
    const { status, json } = await frisby.post(`${url}/sales`, nonexistentProductIdBody);

    expect(status).toBe(404);
    expect(json.message).toEqual("Product not found");
  });

  it("Será validado que não é possível realizar operações em uma venda com o campo `productId` inexistente, em uma requisição com vários items", async () => {
    const { status, json } = await frisby.post(`${url}/sales`, nonexistentProductIdBody2);

    expect(status).toBe(404);
    expect(json.message).toEqual("Product not found");
  });

  it("Será validado que é possível cadastrar uma venda com sucesso", async () => {
    const { status, json } = await frisby.post(`${url}/sales`, rightSaleBody);

    expect(status).toBe(201);
    expect(json).toEqual(saleCreateResponse);
  });
});