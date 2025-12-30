import Products from '../products.model.js';

export default async function () {
	const testProduct = await Products.create({
		name: 'Test Product',
		price: 10.99,
		stock: 100,
	});
	return testProduct;
}
