import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductService from "../../../domain/product/service/product.service";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(ProductRepository: ProductRepositoryInterface){
        this.productRepository = ProductRepository;
    }

    async execute(input: InputUpdateProductDto) : Promise<OutputUpdateProductDto>{
        let product = await this.productRepository.find(input.id);
        
        // const productToBeSaved = new Product(product.id, input.name, input.price);
        product.changeName(input.name);
        product.changePrice(input.price);
        
        await this.productRepository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }


    }
    
}