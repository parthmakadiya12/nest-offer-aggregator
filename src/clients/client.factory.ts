import { Injectable, Type } from '@nestjs/common';
import { DealzClient } from './dealz.client';
import { MDealzClient } from './mdealz.client';
import { IClient } from './Iclient.interface';

@Injectable()
export class ClientFactory {
  private clients: Map<string, IClient> = new Map();

  constructor() {
    this.clients.set('DealzClient', new DealzClient());
    this.clients.set('MDealzClient', new MDealzClient());
  }

  getAvailableClients(): Map<string, IClient> {
    return this.clients;
  }

  getClient(clientType): IClient {
    const clientName = clientType.name;
    if (this.clients.has(clientName)) {
      return this.clients.get(clientName);
    }
    throw new Error(`Client ${clientName} not found`);
  }
}
