import axios from 'axios';
import { config } from '../config';
import { RateLimiter } from '../utils/rateLimiter';

const rateLimiter = new RateLimiter();

export class IspService {
  private baseUrl = config.ispApiUrl;

  async fetchData(endpoint: string) {
    await rateLimiter.acquire();
    const response = await axios.get(`${this.baseUrl}/${endpoint}`);
    return response.data;
  }

  async getCables() {
    return this.fetchData('cables');
  }

  async getDropCables() {
    return this.fetchData('drop_cables');
  }

  async getBoxes() {
    return this.fetchData('boxes');
  }

  async getCustomers() {
    return this.fetchData('customers');
  }
}
