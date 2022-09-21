import { inject, injectable } from 'inversify';
import * as _ from './../core/helper/Decorator';
import { CategoryRepository } from './../repositories/CategoryRepository';
import { CategoryModel } from '../models/Categories';

@injectable()
export class CategoryService{
    constructor(@inject('CategoryRepository') private categoryRepository: CategoryRepository){

    }
};