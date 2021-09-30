import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BankclientService } from './bankclient.service';
import { CreateBankclientDto } from './dto/create-bankclient.dto';
import { UpdateBankclientDto } from './dto/update-bankclient.dto';

@Controller('bankclient')
export class BankclientController {
  constructor(private readonly bankclientService: BankclientService) {}

  @Post()
  create(@Body() createBankclientDto: CreateBankclientDto) {
    return this.bankclientService.create(createBankclientDto);
  }

  @Get()
  findAll() {
    return this.bankclientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankclientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankclientDto: UpdateBankclientDto) {
    return this.bankclientService.update(+id, updateBankclientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankclientService.remove(+id);
  }
}
