import { IsNotEmpty } from 'class-validator';

export class CreateBankclientDto {
  @IsNotEmpty()
  clientCPF: string;
  clientName: string;
  clientBalance: number;
}

export class CreateClientHistoryDto {
  @IsNotEmpty()
  clientCPF: string;
  operation: [any];
}

export class depositDTO {
  @IsNotEmpty()
  clientCPF: string;
  deposit: number;
}

export class withdrawDTO {
  @IsNotEmpty()
  clientCPF: string;
  withdraw: number;
}