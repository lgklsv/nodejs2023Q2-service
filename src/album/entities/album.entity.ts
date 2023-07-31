import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Album implements IAlbum {
  @ApiProperty({ example: uuidv4(), description: 'Valid uuid v4' })
  id: string;

  @ApiProperty({ example: 'UTOPIA' })
  name: string;

  @ApiProperty({ example: 2023 })
  year: number;

  @ApiProperty({
    example: uuidv4(),
    description: 'Valid uuid v4 that  refers to Artist',
  })
  artistId: string | null;
}
