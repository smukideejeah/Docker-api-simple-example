import { sequelize } from '../../../config/database.js';
import deleteTestProduct from '../Services/deleteTestProduct.js';
import TestServer from '../../../shared/utils/TestServer.js';
import { createProduct } from '../Products.controller.js';
import supertest from 'supertest';
afterAll(async () => {
	await deleteTestProduct();
	await sequelize.close();
});

const app = TestServer;
app.post('/v1/products', createProduct);
const testServer = supertest(app);

describe('POST /v1/products', () => {
	test('should create a new product and respond with status 201', async () => {
		//Arrange
		const newProduct = {
			name: 'Test Product',
			stock: 100,
			price: 19.99,
		};
		const expectedStatus = 201;

		//Act
		const resp = await testServer.post('/v1/products').send(newProduct);
		const responseStatus = resp.status;
		const createdProduct = resp.body;

		//Assert
		expect(responseStatus).toBe(expectedStatus);
		expect(createdProduct).toMatchObject(newProduct);
		expect(createdProduct).toHaveProperty('id');
	});

	describe('when a data is missing', () => {
		test('Should respond with status 400 and error message when name is missing', async () => {
			//Arrange
			const newProduct = {
				stock: 100,
				price: 19.99,
			};
			const expectedStatus = 400;
			const expectedMessage = 'Name is required';

			//Act
			const resp = await testServer.post('/v1/products').send(newProduct);
			const responseStatus = resp.status;
			const responseBody = resp.body;

			//Assert
			expect(responseStatus).toBe(expectedStatus);
			expect(responseBody).toHaveProperty('message', expectedMessage);
		});

		test('Should respond with status 400 and error message when price is missing', async () => {
			//Arrange
			const newProduct = {
				name: 'Test Product',
				stock: 100,
			};
			const expectedStatus = 400;
			const expectedMessage = 'Price is required';

			//Act
			const resp = await testServer.post('/v1/products').send(newProduct);
			const responseStatus = resp.status;
			const responseBody = resp.body;

			//Assert
			expect(responseStatus).toBe(expectedStatus);
			expect(responseBody).toHaveProperty('message', expectedMessage);
		});

		test('Should respond with status 400 and error message when stock is missing', async () => {
			//Arrange
			const newProduct = {
				name: 'Test Product',
				price: 19.99,
			};
			const expectedStatus = 400;
			const expectedMessage = 'Stock is required';

			//Act
			const resp = await testServer.post('/v1/products').send(newProduct);
			const responseStatus = resp.status;
			const responseBody = resp.body;

			//Assert
			expect(responseStatus).toBe(expectedStatus);
			expect(responseBody).toHaveProperty('message', expectedMessage);
		});
	});
});
