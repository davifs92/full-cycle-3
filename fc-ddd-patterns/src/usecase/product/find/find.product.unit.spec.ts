import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product Test", 123);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),

  }
}

describe ("Unit find product usecase", () => {


      it("should find a product", async () => {

     
        const productRepository = MockRepository();
        const useCase =  new FindProductUseCase(productRepository);

        const input ={
          id: product.id,
        };

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);

      });

      it("should not find a product", async () => {

        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
          throw new Error("Product not found)");
        })
        const useCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        };

        expect(() =>{
          return useCase.execute(input);
        }).rejects.toThrow("Product not found");



      })

});