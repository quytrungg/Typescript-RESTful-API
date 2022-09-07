import express = require('express');
import {inject, injectable} from 'inversify';
import { ProductService } from '../services';

@injectable()
export class ProductController{
    constructor(@inject("ProductService") private productService: ProductService){

    }
};