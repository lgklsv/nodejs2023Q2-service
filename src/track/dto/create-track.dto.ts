import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
