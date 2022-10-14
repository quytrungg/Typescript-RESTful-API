import * as express from 'express';
import { Container } from 'inversify';
import { CategoryController } from '../controllers';
const router = express.Router()

export class CategoryRoute{
    constructor(private kernel: Container){
    }

    get routes(){
        const categoryController = this.kernel.get<CategoryController>("CategoryController");

        router.route('/')
            .post(categoryController.create.bind(categoryController))
            .get(categoryController.retrieve.bind(categoryController))
        
        router.route('/:id')
            .get(categoryController.findById.bind(categoryController))
            .put(categoryController.updateById.bind(categoryController))
            .delete(categoryController.deleteById.bind(categoryController));

        return router;
    }
};