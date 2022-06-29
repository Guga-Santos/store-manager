const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
require("dotenv").config();

describe("08 - Crie endpoints para listar vendas", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado o acesso ao endpoint através do caminho `/sales`", async () => {
    const { status } = await frisby.get(`${url}/sales`);

    expect(status).toBeLessThan(400);
  });

  it("Será validado que é possível listar todas as vendas", async () => {
    const { status, json } = await frisby.get(`${url}/sales`);

    expect(status).toBe(200);
    expect(json.length).toBe(3);
    expect(json[0]).toHaveProperty("saleId");
    expect(json[0]).toHaveProperty("productId");
    expect(json[0]).toHaveProperty("quantity");
    expect(json[0]).toHaveProperty("date");

    expect(json[0].saleId).toEqual(1);
    expect(json[0].productId).toEqual(1);
    expect(json[0].quantity).toEqual(5);
    expect(json[0].date).toBeDefined();

    expect(json[2]).toHaveProperty("saleId");
    expect(json[2]).toHaveProperty("productId");
    expect(json[2]).toHaveProperty("quantity");
    expect(json[2]).toHaveProperty("date");

    expect(json[2].saleId).toEqual(2);
    expect(json[2].productId).toEqual(3);
    expect(json[2].quantity).toEqual(15);
    expect(json[2].date).toBeDefined();
  });

  it("Será validado que não é possível listar uma venda que não existe", async () => {
    const { status, json } = await frisby.get(`${url}/sales/999`);

    expect(status).toBe(404);
    expect(json.message).toEqual("Sale not found");
  });

  it("Será validado que é possível listar uma venda específica com sucesso", async () => {
    const { status, json } = await frisby.get(`${url}/sales/1`);

    expect(status).toBe(200);
    expect(json.length).toBe(2);
    expect(json[0]).not.toHaveProperty("id");
    expect(json[0]).not.toHaveProperty("saleId");

    expect(json[0]).toHaveProperty("productId");
    expect(json[0]).toHaveProperty("quantity");
    expect(json[0]).toHaveProperty("date");

    expect(json[0].productId).toEqual(1);
    expect(json[0].quantity).toEqual(5);
    expect(json[0].date).toBeDefined();

    expect(json[1]).not.toHaveProperty("id");
    expect(json[1]).not.toHaveProperty("saleId");

    expect(json[1]).toHaveProperty("productId");
    expect(json[1]).toHaveProperty("quantity");
    expect(json[1]).toHaveProperty("date");

    expect(json[1].productId).toEqual(2);
    expect(json[1].quantity).toEqual(10);
    expect(json[1].date).toBeDefined();
  });
});