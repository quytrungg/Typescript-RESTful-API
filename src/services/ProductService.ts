import { inject, injectable } from "inversify";
import * as _ from './../core/helper/Decorator';
import { ProductRepository } from "../repositories";
import { ProductModel } from "../models/Products";

@injectable()
export class ProductService{
    constructor(@inject('ProductRepository') private productRepository: ProductRepository){

    }

    create(data: ProductModel, selectedFields?: string[]): Promise<ProductModel>{
        return this.productRepository.create(data, selectedFields);
    }

    retrieve(page?: number, pageSize: number = 10, filter?: any, selectedFields?: string[], sortBy?: any) {
        return this.productRepository.retrieve(page, pageSize, selectedFields, sortBy);
    }

    updateById(id: string, data: ProductModel, selectedFields?: string[], options?: Object) {
        return this.productRepository.updateById(id, data, selectedFields, options);
    }

    findById(id: string) {
        return this.productRepository.findById(id);
    }

    deleteById(id: string) {
        return this.productRepository.deleteById(id);
    }

};