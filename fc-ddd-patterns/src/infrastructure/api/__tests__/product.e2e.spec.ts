import request from "supertest";
import { app, sequelize } from '../express';

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "Product 1",
                price: 123
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(123);
    });

    it("should not create a product with missing fields", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "product1", // Aqui deve estar faltando o 'type' ou o 'price'
            });

        expect(response.status).toBe(400);
    });

    it("should list all products", async () => {
        // Cria dois produtos para teste
        await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "Product 1",
                price: 123
            });

        await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "Product 2",
                price: 456
            });

        // Obtém a lista de produtos
        const listResponse = await request(app).get("/products");

        expect(listResponse.status).toBe(200);
        console.log(listResponse.body);
        expect(listResponse.body.products.length).toBe(2);

        // Verifica os detalhes do primeiro produto
        const product1 = listResponse.body.products[0];
        expect(product1.name).toBe("Product 1");
        expect(product1.price).toBe(123);

        // Verifica os detalhes do segundo produto
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(456);
    });
});
