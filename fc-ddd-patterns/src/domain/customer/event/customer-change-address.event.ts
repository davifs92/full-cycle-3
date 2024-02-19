import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

export default class ChangeCustomerAddressEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
    address: Address;


  constructor(eventData: any, address: Address) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
    this.address = address;
  }
   
};
