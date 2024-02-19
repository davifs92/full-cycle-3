import Customer from "../../entity/customer"
import Address from "../../value-object/address"
import ChangeCustomerAddressEvent from "../customer-change-address.event"
import CustomerCreatedEvent from "../customer-created.event"
import ChangeCustomerAddressHandler from "./customer-change-address.handler"
import SecondCustomerCreatedHadler from "./new-customer-created.handler second"
import FirstCustomerCreatedHadler from "./new-customer-created.handler.first"

describe('Customer Handler Unit Tests', () => {
    let spyConsoleLog: any
  
    beforeEach(() => {
      spyConsoleLog = jest.spyOn(console, 'log')
    })
  
    afterEach(() => {
      spyConsoleLog.mockRestore()
    })
  
    test('New Customer Created Handler 1', () => {
      const customer = new Customer('1', 'Customer 1', new Address('Street 1', 123, '12560-250', 'São Paulo'))
      const customerCreatedEvent = new CustomerCreatedEvent(customer)
  
      new FirstCustomerCreatedHadler().handle(customerCreatedEvent)
  
      expect(spyConsoleLog).toHaveBeenCalledWith(
        'Esse é o primeiro console.log do evento: CustomerCreated'
      )
    })
  
    test('New Customer Created Hanlder 2', () => {
      const customer = new Customer('1', 'Customer 1', new Address('Street 1', 123, '12560-250', 'São Paulo'))
      const customerCreatedEvent = new CustomerCreatedEvent(customer)
  
      new SecondCustomerCreatedHadler().handle(customerCreatedEvent)
  
      expect(spyConsoleLog).toHaveBeenCalledWith(
        'Esse é o segundo console.log do evento: CustomerCreated'
      )
    })
  
    test('When Customer Address Is Changed Handler', () => {
      const customer = new Customer('1', 'Customer 1', new Address('Street 1', 123, '12560-250', 'São Paulo'))
      const address = new Address('Street 2', 134, '13350-250', 'Minas Gerais')
      customer.changeAddress(address)
      const changeCustomerAddressEvent = new ChangeCustomerAddressEvent({
        id: customer.id,
        name: customer.name        
      }, address)
  
      new ChangeCustomerAddressHandler().handle(
        changeCustomerAddressEvent
      )
  
      expect(spyConsoleLog).toHaveBeenCalledWith(
        `Endereço do cliente: ${customer.id}, ${
          customer.name
        } alterado para: ${customer.Address.toString()}`
      )
    })
  })