import { Request, Response } from 'express';
import Products from '../models/products.model.js';
import getAllProductsService from '../services/products/getAllProducts.js';
import getProductByIdService from '../services/products/getProductById.js';
import createProductService from '../services/products/createProduct.js';
import updateProductService from '../services/products/updateProduct.js';
import deleteProductService from '../services/products/deleteProduct.js';

export async function getAllProducts(req: Request, res: Response) {
	try{
		return res.json(await getAllProductsService());
	}catch(error){
		return res.status(500).json({
			message: 'Error fetching products',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

export async function getProductById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const product = await getProductByIdService(Number(id));
		console.log("Returning product:", product);
		return res.json(product);
	} catch (error) {
		const status = (error as any).status || 500;
		return res.status(status).json({
			message: 'Error fetching product',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const { name, price, stock } = req.body;
		if(!name) throw { status: 400, message: 'Name is required' };
		if(price == null) throw { status: 400, message: 'Price is required' };
		if(stock == null) throw { status: 400, message: 'Stock is required' };
		const newProduct = await createProductService({ name, price, stock });
		res.status(201).json(newProduct);
	} catch (error) {
		const status = (error as any).status || 500;
		return res.status(status).json({
			message: 'Error creating product',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		const { name, price, stock } = req.body;
		const { id } = req.params;

		await updateProductService(Number(id), { name, price, stock });
		return res.status(200).json({
			message: 'Product Updated',
			success: true,
		});
	} catch (error) {
		const status = (error as any).status || 500;
		return res.status(status).json({
			message: 'Error updating product',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

export async function deleteProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;

		await deleteProductService(Number(id));
		return res.status(200).json({ 
			message: 'Product Deleted',
			success: true,
		});
	} catch (error) {
		const status = (error as any).status || 500;
		return res.status(status).json({
			message: 'Error deleting product',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}
