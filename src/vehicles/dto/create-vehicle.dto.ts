import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ description: 'The brand of the vehicle' })
  brand: string;

  @ApiProperty({ description: 'The model of the vehicle' })
  model: string;

  @ApiProperty({ description: 'Number of seats of the vehicle' })
  @IsInt()
  @IsPositive()
  seats: number;

  @ApiProperty({ description: 'The year the vehicle got produced' })
  @IsInt()
  @IsPositive()
  productionYear: number;

  @ApiProperty({ description: 'The category of the vehicle' })
  @IsInt()
  @IsPositive()
  category: number;

  @ApiProperty({description: 'URL to an image of the vehicle'})
  imageUrl: string;

  @ApiProperty({description: 'Price per day to rent the vehicle'})
  @IsNumber()
  @IsPositive()
  pricePerDay: number;
}
