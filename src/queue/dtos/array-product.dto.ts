import { IsArray, IsNumber, Min } from 'class-validator';

export class ArrayProductsDto {
  @IsArray()
  @Min(1, { each: true })
  @IsNumber({}, { each: true })
  products: number[];
}
