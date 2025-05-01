import OZMapSDK from '@ozmap/ozmap-sdk';
import { config } from '../config';
import { logger } from '../utils/logger';

const client = new OZMapSDK(config.ozmapBaseUrl, {
  apiKey: config.ozmapApiKey
});

export class OzmapService {
  async sendCable(cableData: any) {
    if (config.simulateOzmap) {
      logger.info(`[Simulação] Enviando cabo ao OZmap: ${JSON.stringify(cableData)}`);
      return;
    }
    await client.cable.create(cableData);
  }

  async sendDropCable(dropCableData: any) {
    if (config.simulateOzmap) {
      logger.info(`[Simulação] Enviando drop cable ao OZmap: ${JSON.stringify(dropCableData)}`);
      return;
    }
    // Drop cable é um cabo com isDrop: true e kind: 'Drop', mas usa o mesmo endpoint
    await client.cable.create(dropCableData);
  }

  async sendBox(boxData: any) {
    if (config.simulateOzmap) {
      logger.info(`[Simulação] Enviando box ao OZmap: ${JSON.stringify(boxData)}`);
      return;
    }
    await client.box.create(boxData);
  }

  async sendCustomer(customerData: any) {
    if (config.simulateOzmap) {
      logger.info(`[Simulação] Enviando cliente ao OZmap (como pop): ${JSON.stringify(customerData)}`);
      return;
    }
    // Enviando como "pop" pois não existe customer.create no SDK
    await client.pop.create(customerData);
  }
}
