import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class Artist implements IArtist {
  @ApiProperty({ example: uuidv4(), description: 'Valid uuid v4' })
  id: string;

  @ApiProperty({
    example: 'Travis Scott',
  })
  name: string;

  @ApiProperty({
    example: false,
  })
  grammy: boolean;
}
