import * as express from 'express';
import { Container } from 'inversify';
import { ProductController } from '../controllers';
const router = express.Router()

export class ProductRoute{
    constructor(private kernel: Container){
    }

    get routes(){
        const productController = this.kernel.get<ProductController>("productController");

        router.route('/')
            .post(productController.create.bind(productController))
            .get(productController.retrieve.bind(productController))
        
        router.route('/:id')
            .get(productController.findById.bind(productController))
            .put(productController.updateById.bind(productController))
            .delete(productController.deleteById.bind(productController));

        return router;
    }
};