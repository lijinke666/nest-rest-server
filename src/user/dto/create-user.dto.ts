import {IsNotEmpty, MaxLength, IsNumber, Length } from 'class-validator';
export class CreateCatDto {
  @IsNotEmpty()
  @Length(2, 6)
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(11)
  readonly age: number;
}
