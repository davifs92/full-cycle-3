import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let address = new Address('Street 1', 123, '12560-250', 'São Paulo');
      let customer = new Customer("", "John", address);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let address = new Address('Street 1', 123, '12560-250', 'São Paulo');
      let customer = new Customer("123", "", address);
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    let address = new Address('Street 1', 123, '12560-250', 'São Paulo');
    // Arrange
    const customer = new Customer("123", "John", address);

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    const customer = new Customer("1", "Customer 1", address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  
  it("should deactivate customer", () => {
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    const customer = new Customer("1", "Customer 1", address);

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    const customer = new Customer("1", "Customer 1", address);
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
