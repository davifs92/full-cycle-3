import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";



describe ("Integration find product usecase", () => {

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

      it("should find a customer", async () => {


        const product = new Product(uuid(), "Product test", 123);

        const productRepository = new ProductRepository();
        const useCase =  new FindProductUseCase(productRepository);
        const productCreated = await productRepository.create(product);


        const input = {
            id: product.id,
        }

        const output = {
          id: product.id,
          name: "Product test",
          price: 123
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);

      });

});


