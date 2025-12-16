import Products from "../../models/products.model.js";

export default async function(product: Pick<Products, 'name' | 'price' | 'stock'>) {
    return Products.create(product);
}