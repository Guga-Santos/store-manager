const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
const { productSearchNameResponse, allProductsResponse } = require('./_dataMock');
require("dotenv").config();

describe("18 - Crie endpoint products/search?q=searchTerm", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado que é possível buscar um produto pelo name", async () => {
    const { status, json } = await frisby.get(`${url}/products/search?q=Martelo`);

    expect(status).toBe(200);
    expect(json).toEqual(productSearchNameResponse);
  });

  it("Será validado que é possível buscar todos os produtos quando passa a busca vazia", async () => {
    const { status, json } = await frisby.get(`${url}/products/search?q=`);

    expect(status).toBe(200);
    expect(json).toEqual(allProductsResponse);
  });
});