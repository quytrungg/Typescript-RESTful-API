import { Container } from "inversify";
import { CategoryController, ProductController } from "../controllers";
import { CategoryService, ProductService } from "../services";
import { CategoryRepository, ProductRepository } from "../repositories";

class IocConfig{
    static init(){
        const container = new Container();

        // bind controller
        container.bind<CategoryController>('CategoryController').to(CategoryController);
        container.bind<ProductController>('ProductController').to(ProductController);
        
        // bind service
        container.bind<CategoryService>('CategoryService').to(CategoryService);
        container.bind<ProductService>('ProductService').to(ProductService);
        
        // bind repository
        container.bind<CategoryRepository>('CategoryRepository').to(CategoryRepository);
        container.bind<ProductRepository>('ProductRepository').to(ProductRepository);
        
        return container;
    }
}

export default IocConfig.init();