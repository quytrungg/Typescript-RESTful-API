import BaseRepository from "../core/infrastructure/BaseReposity";
import CategorySchema from "../schemas/CategorySchema";
import { injectable } from "inversify";
import { CategoryModel } from "../models/Categories";

@injectable()
export class CategoryRepository extends BaseRepository<CategoryModel>{
    constructor(){
        super(CategorySchema);
    }
};