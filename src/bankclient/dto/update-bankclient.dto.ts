import { PartialType } from '@nestjs/mapped-types';
import {
  CreateBankclientDto,
  CreateClientHistoryDto,
} from './create-bankclient.dto';

export class UpdateBankclientDto extends PartialType(CreateBankclientDto) {}

export class UpdateClientHistoryDto extends PartialType(
  CreateClientHistoryDto,
) {}
