import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import UpdateCustomerUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product A", 123);


const input = {
    id: product.id,
    name: "Product updated",
    price: 456
    
}


const MockRepository = () => {
    return {
        update: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        
    }
}

describe("Unit test for customer update use case", () => {


it("should update a customer", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    const output = await productUpdateUseCase.execute(input);
    expect(output).toEqual(input);


})

});