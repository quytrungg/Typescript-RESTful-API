import express = require("express");
import {inject, injectable} from "inversify";
import {CategoryService} from "../services";
import * as _ from './../core/helper/Decorator';

@injectable()
export class CategoryController{
    constructor(@inject("CategoryService") private categoryService: CategoryService) {

    }
};