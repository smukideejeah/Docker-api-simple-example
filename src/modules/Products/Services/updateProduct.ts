import HTTPError from '../../../shared/utils/HTTPError.js';
import Products from '../products.model.js';

export default async function (
	id: number,
	product: Pick<Products, 'name' | 'price' | 'stock'>
) {
	const existingProduct = await Products.findByPk(id);
	if (!existingProduct) throw new HTTPError('Product Not Found', 404);

	const updated = await Products.update(product, { where: { id } });
	if (updated[0] === 0) throw new HTTPError('Error updating product', 500);
	return true;
}
