import { IsNumber, IsPositive, Min, min } from 'class-validator';

export class OrderItemDto {

    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;
}