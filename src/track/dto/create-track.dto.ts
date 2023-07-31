import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 331,
    description: 'Integer number',
  })
  duration: number;
}
