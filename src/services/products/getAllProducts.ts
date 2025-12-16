import Products from "../../models/products.model.js";

export default function (){
    return Products.findAll();
}