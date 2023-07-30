import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'UTOPIA' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2023 })
  year: number;

  @ApiProperty({
    example: uuidv4(),
    description: 'Valid uuid v4 that  refers to Artist',
  })
  artistId: string | null; // refers to Artist
}
