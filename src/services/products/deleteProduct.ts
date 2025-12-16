import Products from "../../models/products.model.js";

export default async function (productId: number){
    const product = await Products.findByPk(productId);
    if (!product) throw { status: 404, message: 'Product Not Found' };

    const deleted = await Products.destroy({ where: { id: productId } });
    if(deleted === 0) throw { status: 500, message: 'Error deleting product' };
    return true;
}