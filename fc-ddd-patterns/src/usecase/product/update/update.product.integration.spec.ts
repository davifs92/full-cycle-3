import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import UpdateProductUseCase from "./update.product.usecase";



describe ("Integration update product usecase", () => {

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

      it("should update a product", async () => {


        const product = new Product(uuid(), "Product test", 123);

        const productRepository = new ProductRepository();
        const useCase =  new UpdateProductUseCase(productRepository);
        const productCreated = await productRepository.create(product);


        const input = {
          id: product.id,
          name: "Product updated",
          price: 456
          
      }
      
         const output = {
          id: product.id,
          name: "Product updated",
          price: 456
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);

      });

});


