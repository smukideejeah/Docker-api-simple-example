import Products from '../products.model.js';

export default function () {
	return Products.findAll();
}
