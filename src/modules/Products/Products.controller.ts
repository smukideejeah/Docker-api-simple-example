import { Request, Response } from 'express';
import HTTPError from '../../shared/utils/HTTPError.js';
import Service from './Services/index.js';

export async function getAllProducts(req: Request, res: Response) {
	try {
		return res.json(await Service.getAllProducts());
	} catch (error) {
		return res.status(500).json({
			message: 'Error fetching products',
			error: (error as Error).message,
		});
	}
}

export async function getProductById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const product = await Service.getProductById(Number(id));
		return res.json(product);
	} catch (err) {
		const error = err as HTTPError;
		return res.status(error.status).json({
			message: 'Error fetching product',
			error: (err as Error).message,
		});
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const { name, price, stock } = req.body;
		if (!name) throw new HTTPError('Name is required', 400);
		if (price == null) throw new HTTPError('Price is required', 400);
		if (stock == null) throw new HTTPError('Stock is required', 400);
		const newProduct = await Service.createProduct({ name, price, stock });
		res.status(201).json(newProduct);
	} catch (err) {
		const error = err as HTTPError;
		return res.status(error.status).json({
			message: error.message,
			error: 'Error Creating Product',
		});
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		const { name, price, stock } = req.body;
		const { id } = req.params;

		if (!name) throw new HTTPError('Name is required', 400);
		if (price == null) throw new HTTPError('Price is required', 400);
		if (stock == null) throw new HTTPError('Stock is required', 400);

		await Service.updateProduct(Number(id), { name, price, stock });
		return res.status(200).json({
			message: 'Product Updated',
			success: true,
		});
	} catch (err) {
		const error = err as HTTPError;
		return res.status(error.status).json({
			message: error.message,
			error: 'Error updating product',
		});
	}
}

export async function deleteProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;

		await Service.deleteProduct(Number(id));
		return res.status(200).json({
			message: 'Product Deleted',
			success: true,
		});
	} catch (err) {
		const error = err as HTTPError;
		return res.status(error.status).json({
			message: error.message,
			error: 'Error deleting product',
		});
	}
}
