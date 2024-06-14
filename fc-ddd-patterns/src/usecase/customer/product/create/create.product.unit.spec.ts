const input = {
    name: "Product 1",
    price: 10
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit test to Product Use Case", () => {

it("should create a product", async () => {

    const productRepository = MockRepository();
    const useCase = new ProductCreateUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
        name: input.name,
        price: input.price,
    })



});

})