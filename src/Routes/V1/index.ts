import { Application, Router } from 'express';
import ProductsRoute from './Products.route.js';

const V1Router = Router();

V1Router.get('/', (req, res) => {
	res.send('V1 API Root');
});

V1Router.use('/products', ProductsRoute);

export default V1Router;
