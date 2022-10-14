import express = require("express");
import {inject, injectable} from "inversify";
import {CategoryService} from "../services";
import * as _ from './../core/helper/Decorator';

@injectable()
export class CategoryController{
    constructor(@inject("CategoryService") private categoryService: CategoryService) {

    }

    // create a category
    // insert decorator
    create(req: express.Request, res: express.Response){
        return this.categoryService.create(req.body);
    }

    // get all categories
    // insert decorator
    retrieve(req: express.Request, res: express.Response) {
        const page = req.query.page ? Number(req.query.page) : 1,
            pageSize = req.query.pagesize ? Number(req.query.pagesize) : 10;

        return this.categoryService.retrieve(page, pageSize)
    }

    // update a specific category
    // insert decorator
    updateById(req: express.Request, res: express.Response) {
        return this.categoryService.updateById(req.params.id, req.body);
    }

    // find a specific category
    // insert decorator
    findById(req: express.Request, res: express.Response) {
        return this.categoryService.findById(req.params.id);
    }

    // delete a specific category
    // insert decorator
    deleteById(req: express.Request, res: express.Response) {
        return this.categoryService.deleteById(req.params.id);
    }
};