import { IspService } from './IspService';
import { OzmapService } from './OzmapService';
import { SyncRepository } from '../repositories/SyncRepository';
import { logger } from '../utils/logger';
import { mapCableToCreateCableDTO } from '../mappers/CableMapper';
import { mapDropCableToCreateCableDTO } from '../mappers/DropCableMapper';
import { mapBoxToCreateBoxDTO } from '../mappers/BoxMapper';
import { mapCustomerToCreatePopDTO } from '../mappers/CustomerMapper';

export class SyncService {
  private ispService = new IspService();
  private ozmapService = new OzmapService();
  private syncRepository = new SyncRepository();

  async synchronizeAll() {
    try {
      logger.info('Iniciando sincronização com dados do ISP...');

      const [cables, boxes, dropCables, customers] = await Promise.all([
        this.ispService.getCables(),
        this.ispService.getBoxes(),
        this.ispService.getDropCables(),
        this.ispService.getCustomers()
      ]);

      logger.info(`Cabos encontrados: ${cables.length}`);
      logger.info(`Caixas encontradas: ${boxes.length}`);
      logger.info(`Drops encontrados: ${dropCables.length}`);
      logger.info(`Clientes encontrados: ${customers.length}`);

      for (const box of boxes) {
        const boxDTO = mapBoxToCreateBoxDTO(box);
        await this.ozmapService.sendBox(boxDTO);
        await this.syncRepository.saveSync('box', box.id);
      }

      for (const cable of cables) {
        const cableDTO = mapCableToCreateCableDTO(cable);
        await this.ozmapService.sendCable(cableDTO);
        await this.syncRepository.saveSync('cable', cable.id);
      }

      for (const drop of dropCables) {
        const dropDTO = mapDropCableToCreateCableDTO(drop);
        await this.ozmapService.sendDropCable(dropDTO);
        await this.syncRepository.saveSync('dropCable', drop.id);
      }

      for (const customer of customers) {
        const customerDTO = mapCustomerToCreatePopDTO(customer);
        await this.ozmapService.sendCustomer(customerDTO);
        await this.syncRepository.saveSync('customer', customer.id);
      }

      logger.info('✅ Sincronização concluída com sucesso.');
    } catch (error) {
      logger.error(`❌ Erro durante sincronização: ${error}`);
    }
  }
}