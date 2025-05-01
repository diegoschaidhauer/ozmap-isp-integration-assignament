import { DropCable } from '../models/DropCable';
import { config } from '../config';

export function mapDropCableToCreateCableDTO(drop: DropCable): any {
  return {
    project: config.ozmapProjectId,
    cableType: config.defaultCableTypeId,
    implanted: true,
    isDrop: true,
    geometry: {
      type: 'LineString',
      coordinates: [[-48.64, -27.59], [-48.63, -27.58]] // simulei por nao exister esses dados no mock(?????)
    },
    parent: drop.box_id.toString(),
    external_id: drop.id.toString()
  };
}
