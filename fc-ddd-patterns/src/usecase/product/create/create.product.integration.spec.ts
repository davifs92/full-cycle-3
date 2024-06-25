import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import CreateProductUseCase from "./create.product.usecase";



describe ("Integration create product usecase", () => {

    let sequelize: Sequelize;


    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

      it("should create a product", async () => {


        const product = new Product(uuid(), "Product test", 123);

        const productRepository = new ProductRepository();
        const useCase =  new CreateProductUseCase(productRepository);
        const productCreated = await productRepository.create(product);

 
        const result = await useCase.execute("a", product);
        expect(result.name).toEqual(product.name);
        expect(result.price).toEqual(product.price);

      });

});


