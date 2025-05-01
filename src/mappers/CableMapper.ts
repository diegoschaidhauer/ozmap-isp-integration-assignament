import { Cable } from '../models/Cable';
import { config } from '../config';

export function mapCableToCreateCableDTO(cable: Cable): any {
  return {
    project: config.ozmapProjectId,
    cableType: config.defaultCableTypeId,
    implanted: true,
    fiberNumber: cable.capacity,
    looseNumber: cable.capacity,
    geometry: {
      type: 'LineString',
      coordinates: cable.path.map(p => [p.lng, p.lat])
    },
    external_id: cable.id.toString()
  };
}