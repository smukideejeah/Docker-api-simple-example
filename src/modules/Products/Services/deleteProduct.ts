import HTTPError from '../../../shared/utils/HTTPError.js';
import Products from '../products.model.js';

export default async function deleteProduct(productId: number) {
	const product = await Products.findByPk(productId);
	if (!product) throw new HTTPError('Product Not Found', 404);

	const deleted = await Products.destroy({ where: { id: productId } });
	if (deleted === 0) throw new HTTPError('Error deleting product', 500);
	return true;
}
