const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
const { allProductsResponse } = require('./_dataMock');
require("dotenv").config();

describe("01 - Crie endpoints para listar produtos", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado o acesso ao endpoint através do caminho /products", async () => {
    const { status } = await frisby.get(`${url}/products`);

    expect(status).toBeLessThan(400);
  });

  it("Será validado que é possível listar todos os produtos", async () => {
    const { status, json } = await frisby.get(`${url}/products`);

    expect(status).toBe(200);
    expect(json).toEqual(allProductsResponse);
  });

  it("Será validado que não é possível listar um produto que não existe", async () => {
    const { status, json } = await frisby.get(`${url}/products/999`);

    expect(status).toBe(404);
    expect(json.message).toEqual("Product not found");
  });

  it("Será validado que é possível listar um produto específico com sucesso", async () => {
    const { status, json } = await frisby.get(`${url}/products/1`);

    expect(status).toBe(200);
    expect(json).toEqual(allProductsResponse[0]);
  });
});