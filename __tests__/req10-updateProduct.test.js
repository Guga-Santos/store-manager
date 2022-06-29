const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
const { wrongProductBody, wrongSizeProductBody, productUpdateBody } = require('./_dataMock');
require("dotenv").config();

describe("10 - Crie endpoint para atualizar um produto", () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(async () => await runSeed());
  afterAll(async () => await connect().end());

  it("Será validado que não é possível realizar operações em um produto sem o campo name", async () => {
    const { status, json } = await frisby.put(`${url}/products/1`, wrongProductBody);

    expect(status).toBe(400);
    expect(json.message).toEqual("\"name\" is required");
  });

  it("Será validado que não é possível realizar operações em um produto com o campo name menor que 5 caracteres", async () => {
    const { status, json } = await frisby.put(`${url}/products/1`, wrongSizeProductBody);

    expect(status).toBe(422);
    expect(json.message).toEqual("\"name\" length must be at least 5 characters long");
  });

  it("Será validado que não é possível alterar um produto que não existe", async () => {
    const { status, json } = await frisby.put(`${url}/products/999`, productUpdateBody);

    expect(status).toBe(404);
    expect(json.message).toEqual("Product not found");
  });

  it("Será validado que é possível alterar um produto com sucesso", async () => {
    const { status, json } = await frisby.put(`${url}/products/1`, productUpdateBody);

    expect(status).toBe(200);
    expect(json).toHaveProperty("id");
    expect(json).toHaveProperty("name");
    expect(json.name).toBeDefined();
    expect(json.name).toEqual("Machado do Thor Stormbreaker");
  });

  it("Será validado que o produto foi alterado no banco de dados", async () => {
    const { status, json } = await frisby.get(`${url}/products/1`);

    expect(status).toBe(200);
    expect(json.name).toEqual("Machado do Thor Stormbreaker");
  });
});