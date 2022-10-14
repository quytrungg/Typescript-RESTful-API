import express = require('express');
import {inject, injectable} from 'inversify';
import { ProductService } from '../services';
import * as _ from './../core/helper/Decorator';

@injectable()
export class ProductController{
    constructor(@inject("ProductService") private productService: ProductService){

    }

    // create a product
    // insert decorator
    create(req: express.Request, res: express.Response){
        return this.productService.create(req.body);
    }

    // get all products
    // insert decorator
    retrieve(req: express.Request, res: express.Response) {
        const page = req.query.page ? Number(req.query.page) : 1,
            pageSize = req.query.pagesize ? Number(req.query.pagesize) : 10;

        return this.productService.retrieve(page, pageSize)
    }

    // update a specific product
    // insert decorator
    updateById(req: express.Request, res: express.Response) {
        return this.productService.updateById(req.params.id, req.body);
    }
    
    // get a specific product
    // insert decorator
    findById(req: express.Request, res: express.Response) {
        return this.productService.findById(req.params.id);
    }

    // delete a specific product
    // insert decorator
    deleteById(req: express.Request, res: express.Response) {
        return this.productService.deleteById(req.params.id);
    }
};