import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
