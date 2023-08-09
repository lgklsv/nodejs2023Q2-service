import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class User implements IUser {
  @ApiProperty({ example: uuidv4(), description: 'Valid uuid v4' })
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty({
    example: 1,
    description: 'Integer number, increments on update',
  })
  version: number;

  @ApiProperty({ example: Date.now(), description: 'Timestamp of creation' })
  @Transform((prop) =>
    prop.value instanceof Date ? prop.value.getTime() : prop.value,
  )
  createdAt: number;

  @ApiProperty({
    example: Date.now(),
    description: 'Timestamp of last update',
  })
  @Transform((prop) =>
    prop.value instanceof Date ? prop.value.getTime() : prop.value,
  )
  updatedAt: number;
}
