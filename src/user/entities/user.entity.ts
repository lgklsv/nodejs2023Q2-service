import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class User implements IUser {
  @ApiProperty({ example: uuidv4(), description: 'Valid uuid v4' })
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty({
    example: 1,
    description: 'Integer number, increments on update',
  })
  version: number;

  @ApiProperty({ example: Date.now(), description: 'Timestamp of creation' })
  createdAt: number;

  @ApiProperty({
    example: Date.now(),
    description: 'Timestamp of last update',
  })
  updatedAt: number;
}
