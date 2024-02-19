import Customer from "../../customer/entity/customer";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SecondCustomerCreatedHadler from "../../customer/event/handler/new-customer-created.handler second";
import FirstCustomerCreatedHadler from "../../customer/event/handler/new-customer-created.handler.first";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});


it("should notify all event handlers", () => {
  const address = new Address('Street 1', 123, '12560-250', 'São Paulo');
  const customer = new Customer("1","Customer1", address);
  const eventDispatcher = new EventDispatcher();
  const firstEventHandler = new FirstCustomerCreatedHadler();
  const secondEventHandler = new SecondCustomerCreatedHadler();
    
  const firstSpyEventHandler = jest.spyOn(firstEventHandler, "handle");
  const secondSpyEventHandler = jest.spyOn(secondEventHandler, "handle");

  eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
  eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
  ).toMatchObject(firstEventHandler);
  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
  ).toMatchObject(secondEventHandler);

  const customerCreatedEvent = new CustomerCreatedEvent(customer);

  eventDispatcher.notify(customerCreatedEvent);

  expect(firstSpyEventHandler).toHaveBeenCalled();
  expect(secondSpyEventHandler).toHaveBeenCalled();


});
