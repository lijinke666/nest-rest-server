import { IsNumberString } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  readonly pageIndex: number;

  @IsNumberString()
  readonly pageSize: number;
}
