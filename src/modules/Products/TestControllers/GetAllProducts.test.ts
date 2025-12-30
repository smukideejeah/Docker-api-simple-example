import { sequelize } from '../../../config/database.js';
import deleteTestProduct from '../Services/deleteTestProduct.js';
import TestServer from '../../../shared/utils/TestServer.js';
import { getAllProducts } from '../Products.controller.js';
import supertest from 'supertest';
afterAll(async () => {
	await deleteTestProduct();
	await sequelize.close();
});

const app = TestServer;
app.get('/v1/products', getAllProducts);
const testServer = supertest(app);

describe('GET /v1/products', () => {
	test('should respond with status 200', async () => {
		//Arrange
		const expectedStatus = 200;

		//Act
		const response = await testServer.get('/v1/products').send();
		const responseStatus = response.status;

		//Assert
		expect(responseStatus).toBe(expectedStatus);
	});

	test('should respond with an array of products', async () => {
		//Arrange
		const expectedType = Array;
		//Act
		const response = await testServer.get('/v1/products').send();
		const products = response.body;

		//Assert
		expect(products).toBeInstanceOf(expectedType);
	});
});
