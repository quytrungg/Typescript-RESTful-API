import { inject, injectable } from 'inversify';
import * as _ from './../core/helper/Decorator';
import { CategoryRepository } from './../repositories/CategoryRepository';
import { CategoryModel } from '../models/Categories';

@injectable()
export class CategoryService{
    constructor(@inject('CategoryRepository') private categoryRepository: CategoryRepository){

    }

    create(data: CategoryModel, selectedFields?: string[]): Promise<CategoryModel>{
        return this.categoryRepository.create(data, selectedFields);
    }

    retrieve(page?: number, pageSize: number = 10, filter?: any, selectedFields?: string[], sortBy?: any) {
        return this.categoryRepository.retrieve(page, pageSize, selectedFields, sortBy);
    }

    updateById(id: string, data: CategoryModel, selectedFields?: string[], options?: Object) {
        return this.categoryRepository.updateById(id, data, selectedFields, options);
    }

    findById(id: string) {
        return this.categoryRepository.findById(id);
    }

    deleteById(id: string) {
        return this.categoryRepository.deleteById(id);
    }
};