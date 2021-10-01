import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BankclientService } from './bankclient.service';
import {
  CreateBankclientDto,
  depositDTO,
  withdrawDTO,
} from './dto/create-bankclient.dto';
import { UpdateBankclientDto } from './dto/update-bankclient.dto';

@Controller('bankclient')
export class BankclientController {
  constructor(private readonly bankclientService: BankclientService) {}

  @Post()
  create(@Body() createBankclientDto: CreateBankclientDto) {
    return this.bankclientService.createClient(createBankclientDto);
  }

  @Get()
  findAll() {
    return this.bankclientService.findAll();
  }

  @Get(':cpf')
  findClientByCpf(@Param('cpf') cpf: string) {
    return this.bankclientService.findClientByCPF(cpf);
  }

  @Get(':cpf/balancehistory')
  findBalanceHistory(@Param('cpf') cpf: string) {
    return this.bankclientService.findBalanceByCPF(cpf);
  }

  @Get(':cpf/balancehistory/:date')
  findBalanceHistoryByDate(
    @Param('cpf') cpf: string,
    @Param('date') date: string,
  ) {
    return this.bankclientService.findBalanceByCPFAndDate(cpf, date);
  }

  @Patch(':cpf/deposit')
  deposit(@Param('cpf') cpf: string, @Body() depositDto: depositDTO) {
    return this.bankclientService.deposit(cpf, depositDto);
  }

  @Put(':cpf/update')
  update(
    @Param('cpf') cpf: string,
    @Body() updateBankclientDto: CreateBankclientDto,
  ) {
    return this.bankclientService.updateClient(cpf, updateBankclientDto);
  }

  @Patch(':cpf/withdraw')
  withdraw(@Param('cpf') cpf: string, @Body() withdrawDto: withdrawDTO) {
    return this.bankclientService.withdraw(cpf, withdrawDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.bankclientService.remove(cpf);
  }
}
