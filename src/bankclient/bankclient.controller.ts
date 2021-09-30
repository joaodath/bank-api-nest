import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BankclientService } from './bankclient.service';
import { CreateBankclientDto, depositDTO, withdrawDTO } from './dto/create-bankclient.dto';
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bankclientService.findOne(+id);
  // }

  @Get(':cpf')
  findClientByCpf(@Param('cpf') cpf: string) {
    return this.bankclientService.findClientByCPF(cpf);
  }

  @Get(':cpf/balancehistory')
  findBalanceHistory(@Param('cpf') cpf: string) {
    return this.bankclientService.findBalanceByCPF(cpf);
  }

  @Patch(':cpf/deposit')
  deposit(@Param('cpf') cpf: string, @Body() depositDto: depositDTO) {
    return this.bankclientService.deposit(cpf, depositDto);
  }

  @Patch(':cpf/withdraw')
  withdraw(@Param('cpf') cpf: string, @Body() withdrawDto: withdrawDTO) {
    return this.bankclientService.withdraw(cpf, withdrawDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBankclientDto: UpdateBankclientDto) {
  //   return this.bankclientService.update(+id, updateBankclientDto);
  // }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.bankclientService.remove(cpf);
  }
}
