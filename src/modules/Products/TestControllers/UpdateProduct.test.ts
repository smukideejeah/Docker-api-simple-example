import { sequelize } from '../../../config/database.js';
import deleteTestProduct from '../Services/deleteTestProduct.js';
import TestServer from '../../../shared/utils/TestServer.js';
import { updateProduct } from '../Products.controller.js';
import supertest from 'supertest';
import Products from '../products.model.js';
import createTestProduct from '../Services/createTestProduct.js';
afterAll(async () => {
	await deleteTestProduct();
	await sequelize.close();
});

const app = TestServer;
app.put('/v1/products/:id', updateProduct);
const testServer = supertest(app);
let testProduct: Products;

describe('PUT /v1/products/:id', () => {
	test('should update an existing product and respond with status 200', async () => {
		//Arrange
		const updatedData = {
			name: 'Updated Test Product',
			stock: 150,
			price: 29.99,
		};
		const expectedStatus = 200;

		//Act
		testProduct = await createTestProduct();
		const resp = await testServer
			.put(`/v1/products/${testProduct.id}`)
			.send(updatedData);
		const responseStatus = resp.status;
		const responseBody = resp.body;

		//Assert
		expect(responseStatus).toBe(expectedStatus);
		expect(responseBody).toHaveProperty('message', 'Product Updated');
		expect(responseBody).toHaveProperty('success', true);
	});

	describe('when a data is missing', () => {
		test('Should respond with status 400 and error message when name is missing', async () => {
			//Arrange
			const updatedData = {
				stock: 150,
				price: 29.99,
			};
			const expectedStatus = 400;
			const expectedMessage = 'Name is required';

			//Act
			const resp = await testServer.put(`/v1/products/${testProduct.id}`).send(updatedData);
			const responseStatus = resp.status;
			const responseBody = resp.body;

			//Assert
			expect(responseStatus).toBe(expectedStatus);
			expect(responseBody).toHaveProperty('message', expectedMessage);
		});

		test('Should respond with status 400 and error message when price is missing', async () => {
			//Arrange
			const updatedData = {
				name: 'Updated Test Product',
				stock: 150,
			};
			const expectedStatus = 400;
			const expectedMessage = 'Price is required';

			//Act
			const resp = await testServer
				.put(`/v1/products/${testProduct.id}`)
				.send(updatedData);
			const responseStatus = resp.status;
			const responseBody = resp.body;

			//Assert
			expect(responseStatus).toBe(expectedStatus);
			expect(responseBody).toHaveProperty('message', expectedMessage);
		});

		test('Should respond with status 400 and error message when stock is missing', async () => {
			//Arrange
			const updatedData = {
				name: 'Updated Test Product',
				price: 29.99,
			};
			const expectedStatus = 400;
			const expectedMessage = 'Stock is required';

			//Act
			const resp = await testServer
				.put(`/v1/products/${testProduct.id}`)
				.send(updatedData);
			const responseStatus = resp.status;
			const responseBody = resp.body;

			//Assert
			expect(responseStatus).toBe(expectedStatus);
			expect(responseBody).toHaveProperty('message', expectedMessage);
		});

		test('Should respond with status 404 when product does not exist', async () => {
			//Arrange
			const expectedStatus = 404;
			const expectedMessage = 'Product Not Found';
			const updatedData = {
				name: 'Updated Test Product',
				stock: 150,
				price: 29.99,
			};

			//Act
			await deleteTestProduct();
			const resp = await testServer
				.put(`/v1/products/${testProduct.id}`)
				.send(updatedData);
			const responseStatus = resp.status;
			const responseBody = resp.body;

			//Assert
			expect(responseStatus).toBe(expectedStatus);
			expect(responseBody).toHaveProperty('message', expectedMessage);
		});
	});
});
