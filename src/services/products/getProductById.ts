import Products from "../../models/products.model.js";

export default async function (productId: number){
    const product = await Products.findByPk(productId);
    if (product === null) throw { status: 404, message: 'Product Not Found' };
    return product;
}