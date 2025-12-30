import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from './Products.controller.js';
import exampleEndpointMiddleware from '../../middlewares/exampleEndpoint.middleware.js';

const ProductsRouteV1 = Router();

ProductsRouteV1.get('/', exampleEndpointMiddleware, getAllProducts);
ProductsRouteV1.get('/:id', getProductById);
ProductsRouteV1.post('/', createProduct);
ProductsRouteV1.put('/:id', updateProduct);
ProductsRouteV1.delete('/:id', deleteProduct);
export default ProductsRouteV1;
