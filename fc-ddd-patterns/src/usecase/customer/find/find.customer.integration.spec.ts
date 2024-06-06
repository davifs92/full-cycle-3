import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe ("Integration find customer usecase", () => {

    let sequelize: Sequelize;


    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

      it("should find a customer", async () => {


        const address = new Address("Street Address", 123, "Zip", "City");
        const costumer = new Customer("123", "John", address);
        const customerRepository = new CustomerRepository();
        const useCase =  new FindCustomerUseCase(customerRepository);
        const customerCreated = await customerRepository.create(costumer);


        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street Address",
                city: "City",
                number: 123,
                zip: "Zip"
            }
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);

      });

});