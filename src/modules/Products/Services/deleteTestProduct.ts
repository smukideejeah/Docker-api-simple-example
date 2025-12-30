import Products from '../products.model.js';

export default async function () {
	await Products.destroy({ where: { name: 'Test Product' } });
	await Products.destroy({ where: { name: 'Updated Test Product' } });
}
