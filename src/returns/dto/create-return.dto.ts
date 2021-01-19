import { ApiProperty } from '@nestjs/swagger';

export class CreateReturnDto {
  @ApiProperty({ description: 'The reservation this refers to' })
  reservation: number;

  @ApiProperty({ description: 'Whether the vehicle had any issues when it got returned' })
  hadIssues: boolean;
}
