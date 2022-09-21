import express = require('express');
import {inject, injectable} from 'inversify';
import { ProductService } from '../services';
import * as _ from './../core/helper/Decorator';

@injectable()
export class ProductController{
    constructor(@inject("ProductService") private productService: ProductService){

    }
};