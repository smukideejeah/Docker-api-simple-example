import HTTPError from '../../../shared/utils/HTTPError.js';
import Products from '../products.model.js';

export default async function (productId: number) {
	const product = await Products.findByPk(productId);
	if (product === null) throw new HTTPError('Product Not Found', 404);
	return product;
}
