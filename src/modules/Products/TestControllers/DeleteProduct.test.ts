import { sequelize } from '../../../config/database.js';
import deleteTestProduct from '../Services/deleteTestProduct.js';
import TestServer from '../../../shared/utils/TestServer.js';
import { deleteProduct } from '../Products.controller.js';
import supertest from 'supertest';
import Products from '../products.model.js';
import createTestProduct from '../Services/createTestProduct.js';
afterAll(async () => {
	await deleteTestProduct();
	await sequelize.close();
});

const app = TestServer;
app.delete('/v1/products/:id', deleteProduct);
const testServer = supertest(app);
let testProduct: Products;

describe('DELETE /v1/products/:id', () => {
	test('should delete an existing product and respond with status 200', async () => {
		//Arrange
		const expectedStatus = 200;

		//Act
		testProduct = await createTestProduct();
		const resp = await testServer
			.delete(`/v1/products/${testProduct.id}`)
			.send();
		const responseStatus = resp.status;
		const responseBody = resp.body;

		//Assert
		expect(responseStatus).toBe(expectedStatus);
		expect(responseBody).toHaveProperty('message', 'Product Deleted');
		expect(responseBody).toHaveProperty('success', true);
	});

	test('should respond with status 404 and error when the product does not exist', async () => {
		//Arrange
		const expectedStatus = 404;
		const expectedMessage = 'Product Not Found';

		//Act
		const resp = await testServer
			.delete(`/v1/products/${testProduct.id}`)
			.send();
		const responseStatus = resp.status;
		const responseBody = resp.body;

		//Assert
		expect(responseStatus).toBe(expectedStatus);
		expect(responseBody).toHaveProperty('message', expectedMessage);
	});
});
