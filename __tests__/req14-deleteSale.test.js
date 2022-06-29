const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
require("dotenv").config();

describe("14 - Crie endpoint para deletar uma venda", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado que não é possível deletar uma venda que não existe", async () => {
    const { status, json } = await frisby.delete(`${url}/sales/999`);

    expect(status).toBe(404);
    expect(json.message).toEqual("Sale not found");
  });

  it("Será validado que é possível deletar uma venda com sucesso", async () => {
    const { status } = await frisby.delete(`${url}/sales/1`);

    expect(status).toBe(204);
  });

  it("Será validado que a venda foi removida do banco de dados", async () => {
    const { status, json } = await frisby.get(`${url}/sales/1`);

    expect(status).toBe(404);
    expect(Object.keys(json)).toContain("message");
    expect(json.message).toEqual("Sale not found");
  });
});