const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
const { productUpdateBody } = require('./_dataMock');
require("dotenv").config();

describe("12 - Crie endpoint para deletar um produto", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado que não é possível deletar um produto que não existe", async () => {
    const { status, json } = await frisby.delete(`${url}/products/999`, productUpdateBody);

    expect(status).toBe(404);
    expect(json.message).toEqual("Product not found");
  });

  it("Será validado que é possível deletar um produto com sucesso", async () => {
    const { status } = await frisby.delete(`${url}/products/1`);

    expect(status).toBe(204);
  });

  it("Será validado que o produto foi removido do banco de dados", async () => {
    const { status, json } = await frisby.get(`${url}/products/1`);

    expect(status).toBe(404);
    expect(Object.keys(json)).toContain("message");
    expect(json.message).toEqual("Product not found");
  });
});