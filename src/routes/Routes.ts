import { Router } from 'express-serve-static-core';
import kernel from '../containers/IocConfig';
import { CategoryRoute } from './CategoryRoute';
import { ProductRoute } from './ProductRoute';

export default class Route{
    static register(app: { use: (arg0: string, arg1: Router) => void; }){
        global["IocContainer"] = kernel;
        const iocContainer = global["IocContainer"];

        app.use('/categories', new CategoryRoute(iocContainer).routes);

        app.use('/products', new ProductRoute(iocContainer).routes);
    }
}