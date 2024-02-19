import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ChangeCustomerAddressEvent from "../customer-change-address.event";

export default class ChangeCustomerAddressHandler implements 
EventHandlerInterface<ChangeCustomerAddressEvent> {

    handle(event: ChangeCustomerAddressEvent): void {
        console.log("Endereço do cliente: " + event.eventData.id +  ", " + event.eventData.name + 
        " alterado para: " + event.address);
        
    }

};
