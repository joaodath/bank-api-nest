import { PartialType } from '@nestjs/mapped-types';
import { CreateBankclientDto } from './create-bankclient.dto';

export class UpdateBankclientDto extends PartialType(CreateBankclientDto) {}
