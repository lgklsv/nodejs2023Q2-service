import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class Track implements ITrack {
  @ApiProperty({ example: uuidv4(), description: 'Valid uuid v4' })
  id: string;

  @ApiProperty({ example: 'TIL FURTHER NOTICE' })
  name: string;

  @ApiProperty({
    example: uuidv4(),
    description: 'Valid uuid v4 that refers to Artist',
  })
  artistId: string | null;

  @ApiProperty({
    example: uuidv4(),
    description: 'Valid uuid v4 that refers to Album',
  })
  albumId: string | null;

  @ApiProperty({
    example: 331,
    description: 'Integer number',
  })
  duration: number;
}
