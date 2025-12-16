import { Request, Response } from 'express';
import Products from '../models/products.model.js';

export async function getAllProducts(req: Request, res: Response) {
	const products = await Products.findAll();
	res.json({ message: 'Products List', products });
}

export async function getProductById(req: Request, res: Response) {
	const { id } = req.params;
	const product = await Products.findByPk(id);
	if (!product) return res.status(404).json({ message: 'Product Not Found' });
	res.json({ message: 'Product Found', product });
}

export async function createProduct(req: Request, res: Response) {
	try {
		console.log(req.body);
		const { name, price, stock } = req.body;
		const newProduct = await Products.create({
			name,
			price,
			stock,
		});
		res.status(201).json({
			message: 'Product Created',
			product: newProduct,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error creating product',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		console.log(req.params.id);
		const { name, price, stock, isActive } = req.body;
		const { id } = req.params;

		const product = await Products.findByPk(id);
		if (!product)
			return res.status(404).json({ message: 'Product Not Found' });

		const productUpdated = await Products.update(
			{
				name,
				price,
				stock,
				isActive,
			},
			{
				where: { id },
			}
		);
		console.log(productUpdated);
		//last updated product
		res.status(200).json({
			message: 'Product Updated',
			affected: productUpdated,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error creating product',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

export async function deleteProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const product = await Products.findByPk(id);
		if (!product)
			return res.status(404).json({ message: 'Product Not Found' });

		const deleted = await Products.destroy({
			where: { id },
		});
		res.status(200).json({ message: 'Product Deleted', affected: deleted });
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting product',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}
