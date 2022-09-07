import express = require("express");
import {inject, injectable} from "inversify";
import {CategoryService} from "../services";

@injectable()
export class CategoryController{
    constructor(@inject("CategoryService") private categoryService: CategoryService) {

    }
};