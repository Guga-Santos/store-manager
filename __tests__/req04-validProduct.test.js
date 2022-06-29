require("dotenv").config();
const frisby = require("frisby");
const { wrongProductBody, wrongSizeProductBody } = require('./_dataMock');

jest.mock('mysql2/promise', () => {
	const connectionError = new Error("Neste requisito de validação, não é necessário conectar com o banco de dados");
	const connectionMock = jest.fn().mockImplementation(() => ({
		execute: jest.fn().mockRejectedValue(connectionError),
		query: jest.fn().mockRejectedValue(connectionError),
	}))

	return {
		createPool: connectionMock,
		createConnection: connectionMock, createPoolCluster: connectionMock
	}
});

describe("04 - Crie validações para produtos", () => {
  const url = `http://localhost:${process.env.PORT}`;

  it("Será validado que não é possível realizar operações em um produto sem o campo name", async () => {
    const { status, json } = await frisby.post(`${url}/products`, wrongProductBody);

    expect(status).toBe(400);
    expect(json.message).toEqual("\"name\" is required");
  });

  it("Será validado que não é possível realizar operações em um produto com o campo name menor que 5 caracteres", async () => {
    const { status, json } = await frisby.post(`${url}/products`, wrongSizeProductBody);

    expect(status).toBe(422);
    expect(json.message).toEqual("\"name\" length must be at least 5 characters long");
  });
});