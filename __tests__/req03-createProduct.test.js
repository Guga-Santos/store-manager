require("dotenv").config();
const frisby = require("frisby");
const { runSeed, connect } = require('./_utils');
const { rightProductBody, productCreateResponse } = require('./_dataMock');


describe("03 - Crie endpoint para cadastrar produtos", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado que é possível cadastrar um produto com sucesso", async () => {
    const { status, json } = await frisby.post(`${url}/products`, rightProductBody);

    expect(status).toBe(201);
    expect(json).toEqual(productCreateResponse);
  });
});