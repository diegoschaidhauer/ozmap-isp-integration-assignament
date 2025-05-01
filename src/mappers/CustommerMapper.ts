import { Customer } from '../models/Customer';
import { config } from '../config';

export function mapCustomerToCreatePopDTO(customer: Customer): any {
  return {
    name: customer.name,
    implanted: true,
    project: config.ozmapProjectId,
    connectedTo: customer.box_id.toString(),
    geometry: {
      type: 'Point',
      coordinates: [-48.63, -27.58] // simulei, pois não existem esses dados no mock
    },
    external_id: customer.id.toString()
  };
}