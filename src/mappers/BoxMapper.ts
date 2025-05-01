import { Box } from '../models/Box';
import { config } from '../config';

export function mapBoxToCreateBoxDTO(box: Box): any {
  return {
    project: config.ozmapProjectId,
    boxType: config.boxTypeId,
    implanted: true,
    hierarchyLevel: 1,
    geometry: {
      type: 'Point',
      coordinates: [box.lng, box.lat]
    },
    external_id: box.id.toString()
  };
}