import { Injectable } from '@nestjs/common';
import {
  CreateBankclientDto,
  CreateClientHistoryDto,
  depositDTO,
  withdrawDTO,
} from './dto/create-bankclient.dto';
import { UpdateBankclientDto } from './dto/update-bankclient.dto';

const bankClients = [
  { clientCPF: '12345678901', clientName: 'João', clientBalance: 50 },
];

const bankHistory = [
  {
    clientCPF: '12345678901',
    operation: [
      { operation: 'deposit', value: 100 },
      { operation: 'withdraw', value: 50 },
    ],
  },
];

@Injectable()
export class BankclientService {
  // reusing code
  findClient(clientCPF: string) {
    return bankClients.find((client) => client.clientCPF === clientCPF);
  }

  findHistory(clientCPF: string) {
    return bankHistory.find((history) => history.clientCPF == clientCPF);
  }

  createClient(createBankclientDto: CreateBankclientDto) {
    const clientExists = bankClients.find(
      (client) => client.clientCPF == createBankclientDto.clientCPF,
    );
    if (clientExists) {
      return {
        error: 'Client already exists',
      };
    } else {
      createBankclientDto.clientBalance = 0;
      bankClients.push(createBankclientDto);

      const createClientHistoryDto: CreateClientHistoryDto = {
        clientCPF: createBankclientDto.clientCPF,
        operation: [
          { operation: 'deposit', value: createBankclientDto.clientBalance },
        ],
      };
      bankHistory.push(createClientHistoryDto);

      const newClientData = this.findClientByCPF(createBankclientDto.clientCPF);
      return newClientData;
    }
  }

  findAll() {
    const bankData = {
      bankClients,
      bankHistory,
    };
    return bankData;
  }

  findAllClientDataByCPF(cpf: string) {
    const clientInfo = this.findClient(cpf);
    if (clientInfo) {
      const clientHistory = this.findHistory(cpf);
      const clientData = [clientInfo, clientHistory];
      return clientData;
    } else {
      return {
        error: 'Client not found',
      };
    }
  }

  findClientByCPF(cpf: string) {
    const clientInfo = this.findClient(cpf);
    if (clientInfo) {
      return clientInfo;
    } else {
      return {
        error: 'Client not found',
      };
    }
  }

  findBalanceByCPF(cpf: string) {
    const clientHistory = this.findHistory(cpf);
    if (clientHistory) {
      return clientHistory;
    } else {
      return {
        error: 'Client not found',
      };
    }
  }

  deposit(cpf: string, depositDto: depositDTO) {
    const clientInfo = this.findClient(cpf);
    if (clientInfo) {
      const clientHistory = this.findHistory(cpf);
      clientInfo.clientBalance += depositDto.deposit;
      clientHistory.operation.push({
        operation: 'deposit',
        value: depositDto.deposit,
      });
      return this.findClient(cpf);
    } else {
      return {
        error: 'Client not found',
      };
    }
  }

  withdraw(cpf: string, withdrawDto: withdrawDTO) {
    const clientInfo = this.findClient(cpf);
    if (clientInfo) {
      const clientHistory = this.findHistory(cpf);
      if (clientInfo.clientBalance >= withdrawDto.withdraw) {
        clientInfo.clientBalance -= withdrawDto.withdraw;
        clientHistory.operation.push({
          operation: 'withdraw',
          value: withdrawDto.withdraw,
        });
        return this.findClient(cpf);
      } else {
        return {
          error: 'Insufficient balance',
        };
      }
    } else {
      return {
        error: 'Client not found',
      };
    }
  }

  update(id: number, updateBankclientDto: UpdateBankclientDto) {
    return `This action updates a #${id} bankclient`;
  }

  remove(cpf: string) {
    const clientInfo = this.findClient(cpf);
    if (clientInfo) {
      const indexInfo = bankClients.findIndex(
        (client) => client.clientCPF == clientInfo.clientCPF,
      );
      bankClients.splice(indexInfo, 1);

      const indexHistory = bankHistory.findIndex(
        (client) => client.clientCPF == clientInfo.clientCPF,
      );
      bankHistory.splice(indexHistory, 1);
      return { success: 'Client Removed' };
    } else {
      return {
        error: 'Client not found',
      };
    }
  }
}
