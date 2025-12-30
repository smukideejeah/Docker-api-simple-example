import { sequelize } from '../../../config/database.js';
import deleteTestProduct from '../Services/deleteTestProduct.js';
import TestServer from '../../../shared/utils/TestServer.js';
import { getProductById } from '../Products.controller.js';
import supertest from 'supertest';
import Products from '../products.model.js';
import createTestProduct from '../Services/createTestProduct.js';
afterAll(async () => {
	await deleteTestProduct();
	await sequelize.close();
});

const app = TestServer;
app.get('/v1/products/:id', getProductById);
const testServer = supertest(app);
let testProduct: Products;
describe('GET /v1/products/:id', () => {
	test('should respond with status 200 for existing product', async () => {
		//Arrange
		const expectedStatus = 200;

		//Act
		testProduct = await createTestProduct();
		const response = await testServer
			.get(`/v1/products/${testProduct.id}`)
			.send();
		const responseStatus = response.status;
		const fetchedProduct = response.body;
		//Assert
		expect(responseStatus).toBe(expectedStatus);
		expect(fetchedProduct).toHaveProperty('id', testProduct.id);
	});

	test('should respond with status 404 for non-existing product', async () => {
		//Arrange
		const expectedStatus = 404;

		//Act
		await deleteTestProduct();
		const response = await testServer
			.get(`/v1/products/${testProduct.id}`)
			.send();
		const responseStatus = response.status;

		//Assert
		expect(responseStatus).toBe(expectedStatus);
	});
});
