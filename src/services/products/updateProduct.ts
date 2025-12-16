import Products from "../../models/products.model.js";

export default async function(id: number, product: Pick<Products, 'name' | 'price' | 'stock'>) {
    const existingProduct = await Products.findByPk(id);
    if(!existingProduct) throw { status: 404, message: 'Product Not Found' };

    const updated = await Products.update(product, { where: { id } });
    if(updated[0] === 0) throw { status: 500, message: 'Error updating product' };
    return true;
}