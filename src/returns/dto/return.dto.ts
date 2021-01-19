import { BaseDto } from '../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Return } from '../entities/return.entity';

export class ReturnDto extends BaseDto {
  @ApiProperty({ description: 'The reservation this refers to' })
  reservation: number;

  @ApiProperty({ description: 'The employee who triggered the return of a vehicle' })
  createdBy: number;

  @ApiProperty({ description: 'Whether the vehicle had any issues when it got returned' })
  hadIssues: boolean;

  public static map(ret: Return): ReturnDto {
    return {
      ...ret,
      reservation: ret.reservation?.id,
      createdBy: ret.createdBy?.id,
    };
  }

  public static mapList(returns: Return[]): ReturnDto[] {
    return returns.map(ReturnDto.map);
  }
}
