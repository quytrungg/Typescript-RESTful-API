import "reflect-metadata";
import { Model, Document, LeanDocument } from "mongoose";
import { pick } from "lodash";
import { injectable, unmanaged } from "inversify";
import * as Q from "q";
import Log from "../logs/Log";

@injectable()
export default class BaseRepository<DataModel>{
    private _model: Model<Document>;

    constructor(@unmanaged() schemaModel: Model<Document>) {
        this._model = schemaModel;
    }

    // create a model
    async create(data: DataModel, selectedFields?: string[]): Promise<DataModel> {
        return await this._model.create(data)
            .then((result) => {
                return selectedFields ? pick(result, selectedFields) : result;
            })
            .catch((err) => {
                Log.error(err);
                throw err;
            });
    }

    retrieve(page?: number, pageSize: number = 10, filter?: any, selectedFields?: string[], sortBy?: any): Promise<[number, LeanDocument<Document<DataModel>>[]]> {
        let query = this._model.find(filter);

        if (sortBy) {
            query = query.sort(sortBy);
        }

        if (page) {
            query = query.skip((page - 1) * pageSize);
            query = query.limit(pageSize);
        }

        if (selectedFields) {
            query = query.select(selectedFields.join(' '));
        }

        return Q.all([this._model.count(filter).exec(), query.lean(true).exec()]);
    }

    async update(condition: Object, data: DataModel, options: Object): Promise<DataModel> {
        let query = this._model.update(condition, data, options);

        return await query.exec()
            .then((result) => {
                if (result) {
                    return data;
                } else {
                    throw new Error('Key not found');
                }
            });
    }

    async updateById(id: string, data: DataModel, selectedFields?: string[], options?: Object): Promise<DataModel | Document<DataModel>> {
        let query = this._model.findByIdAndUpdate(id, data, options);

        return await query.exec()
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new Error('Key not found');
                }
            });
    }

    async findById(id: string, options?: { selectedFields: string[] }): Promise<DataModel | Document<DataModel> | LeanDocument<Document<DataModel>>> {
        let query = this._model.findById(id);

        if (options?.selectedFields?.length) {
            query = query.select(options.selectedFields.join((" ")));
        }

        return await query.lean(true).exec()
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new Error('Key not found');
                }
            });
    }

    async delete(condition: Object) {
        let query = this._model.remove(condition);

        return await query.exec()
            .then((result) => {
                if (result["result"]["n"] === 0) {
                    throw new Error('Key not found');
                } else {
                    return result["result"];
                }
            });
    }

    async deleteById(id: string): Promise<DataModel | Document<DataModel>> {
        return await this._model.findByIdAndDelete(id)
            .then((result) => {
                if (result) {
                    return result;
                }
                throw new Error('Key not found');
            });
    }

    async findOne(condition: Object, selectedFields?: string[], lean?: boolean): Promise<DataModel | Document<DataModel> | LeanDocument<Document<DataModel>>> {
        let query = this._model.findOne(condition);

        if (selectedFields && selectedFields.length) {
            query = query.select(selectedFields.join((" ")));
        }

        return await query.lean(lean).exec()
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new Error('Key not found');
                }
            });
    }

};