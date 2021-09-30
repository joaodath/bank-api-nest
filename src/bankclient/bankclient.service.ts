import { Injectable } from '@nestjs/common';
import {
  CreateBankclientDto,
  CreateClientHistoryDto,
  depositDTO,
  withdrawDTO,
} from './dto/create-bankclient.dto';
import { UpdateBankclientDto } from './dto/update-bankclient.dto';

const bankClients = [
  {
    clientCPF: '12345678901',
    clientName: 'João',
    clientBalance: 50,
    openingDate: '29-09-2021--13-14-52',
  },
];

const bankHistory = [
  {
    clientCPF: '12345678901',
    operation: [
      {
        operation: 'deposit',
        value: 100,
        operationDate: '29-09-2021--13-14-52',
      },
      {
        operation: 'withdraw',
        value: 50,
        operationDate: '29-09-2021--13-14-52',
      },
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

  findDate() {
    const dateNow = new Date(Date.now());
    const dateFound =
      dateNow.getDate() +
      '-' +
      (dateNow.getMonth() + 1) +
      '-' +
      dateNow.getFullYear() +
      '--' +
      dateNow.getHours() +
      '-' +
      dateNow.getMinutes() +
      '-' +
      dateNow.getSeconds();
    return dateFound;
  }

  createClient(createBankclientDto: CreateBankclientDto) {
    const clientExists = this.findClient(createBankclientDto.clientCPF);
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
          {
            operation: 'deposit',
            value: createBankclientDto.clientBalance,
            operationDate: this.findDate(),
          },
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

  findBalanceByCPFAndDate(cpf: string, date: string) {
    const clientHistory = this.findHistory(cpf);
    if (clientHistory) {
      const clientHistoryByDate = clientHistory.operation.find(
        (operation) => operation.operationDate === date,
      );
      if (clientHistoryByDate) {
        return clientHistoryByDate;
      } else {
        return {
          error: 'History not found using this date',
        };
      }
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
        operationDate: this.findDate(),
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
          operationDate: this.findDate(),
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

  updateClient(cpf: string, updateBankclientDto: CreateBankclientDto) {
    const clientExists = this.findClient(cpf);
    if (clientExists) {
      updateBankclientDto.clientBalance = clientExists.clientBalance;
      updateBankclientDto.clientCPF = clientExists.clientCPF;
      const clientIndex = bankClients.findIndex(
        (client) => client.clientCPF === cpf,
      );
      bankClients[clientIndex] = updateBankclientDto;
      return this.findClient(cpf);
    } else {
      return {
        error: 'Client not found',
      };
    }
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
