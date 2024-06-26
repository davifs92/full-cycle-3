import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());

    try{

        if (!req.body.name || !req.body.price) {
            return res.status(400).send('Name and price are required.');
        }

        const type = req.body.type;

        const productDto = {
            name: req.body.name,
            price: req.body.price
            
        }
        console.log(productDto);
        const output = await usecase.execute(type, productDto);
        res.send(output);
    } catch (err) {
        console.log(req);
        res.status(500).send(err);
    }
});


productRoute.get('/', async(req: Request, res: Response) => {

    try{
    const usecase = new ListProductUseCase(new ProductRepository());
    const output = await usecase.execute({});
    res.send(output);
    } catch (err) {
       res.status(500).send(err);
    }
})