
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product A", 123);

const product2 = ProductFactory.create("b", "Product B", 456);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
        };

};

describe("Unit test for listing product use case", () => {

    
    it("should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);
        const result = await useCase.execute({});
    
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);
    
        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);
    
        
    })

   

})