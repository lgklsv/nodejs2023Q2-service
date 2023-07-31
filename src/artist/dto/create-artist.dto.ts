import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Travis Scott',
  })
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
  })
  grammy: boolean;
}
