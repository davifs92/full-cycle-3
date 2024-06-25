import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import ListProductUseCase from "./list.product.usecase";



describe ("Integration list all products usecase", () => {

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

      it("should lsit all products", async () => {


        const product1 = new Product(uuid(), "Product test 1", 123);
        const product2 = new Product(uuid(), "Product test 2", 456);

        const productRepository = new ProductRepository();
        const useCase =  new ListProductUseCase(productRepository);
        const productCreated1 = await productRepository.create(product1);
        const productCreated2 = await productRepository.create(product2);

   
        const result = await useCase.execute({});
        expect(result.products[0].name).toEqual(product1.name);
        expect(result.products[0].price).toEqual(product1.price);
        expect(result.products[1].name).toEqual(product2.name);
        expect(result.products[1].price).toEqual(product2.price);




      });

});


