import { Injectable } from '@nestjs/common';
import { CreateBankclientDto } from './dto/create-bankclient.dto';
import { UpdateBankclientDto } from './dto/update-bankclient.dto';

@Injectable()
export class BankclientService {
  create(createBankclientDto: CreateBankclientDto) {
    return 'This action adds a new bankclient';
  }

  findAll() {
    return `This action returns all bankclient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankclient`;
  }

  update(id: number, updateBankclientDto: UpdateBankclientDto) {
    return `This action updates a #${id} bankclient`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankclient`;
  }
}
