import { Application, Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from '../../Controllers/Products.controller.js';

const ProductsRoute = Router();

ProductsRoute.get('/', getAllProducts);
ProductsRoute.get('/:id', getProductById);
ProductsRoute.post('/', createProduct);
ProductsRoute.put('/:id', updateProduct);
ProductsRoute.delete('/:id', deleteProduct);

export default ProductsRoute;
