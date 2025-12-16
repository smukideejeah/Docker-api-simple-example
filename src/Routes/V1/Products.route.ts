import { Application, Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from '../../Controllers/Products.controller.js';
import exampleEndpointMiddleware from '../../middlewares/exampleEndpoint.middleware.js';

const ProductsRoute = Router();

ProductsRoute.get('/', exampleEndpointMiddleware, getAllProducts);
ProductsRoute.get('/:id', getProductById);
ProductsRoute.post('/', createProduct);
ProductsRoute.put('/:id', updateProduct);
ProductsRoute.delete('/:id', deleteProduct);

export default ProductsRoute;
