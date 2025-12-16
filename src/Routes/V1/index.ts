import { Application, Router } from 'express';
import ProductsRoute from './Products.route.js';
import exampleSectionMiddleware from '../../middlewares/exampleSection.middleware.js';

const V1Router = Router();

V1Router.get('/', (req, res) => {
	res.send('V1 API Root');
});

V1Router.use('/products', exampleSectionMiddleware, ProductsRoute);

export default V1Router;
