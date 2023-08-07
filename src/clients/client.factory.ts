import { Injectable, Type } from '@nestjs/common';
import { DealzClient } from './dealz.client';
import { MDealzClient } from './mdealz.client';

@Injectable()
export class ClientFactory {
  private clients: Map<string, any> = new Map();

  constructor() {
    this.clients.set('DealzClient', new DealzClient());
    this.clients.set('MDealzClient', new MDealzClient());
  }

  getAvailableClients(): Map<string, any> {
    return this.clients;
  }

  getClient<T>(clientType: Type<T>): T {
    const clientName = clientType.name;
    if (this.clients.has(clientName)) {
      return this.clients.get(clientName);
    }
    throw new Error(`Client ${clientName} not found`);
  }
}
