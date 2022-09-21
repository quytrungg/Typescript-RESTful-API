import BaseRepository from "../core/infrastructure/BaseReposity";
import ProductSchema from "../schemas/ProductSchema";
import { injectable } from "inversify";
import { ProductModel } from "../models/Products";

@injectable()
export class ProductRepository extends BaseRepository<ProductModel>{
    constructor(){
        super(ProductSchema);
    }
};