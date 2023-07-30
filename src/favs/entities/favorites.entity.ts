import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorites implements IFavorites {
  @ApiProperty({
    example: {
      type: 'array',
      items: { $ref: getSchemaPath(Track) },
    },
  })
  tracks: ITrack[];

  @ApiProperty({
    example: {
      type: 'array',
      items: { $ref: getSchemaPath(Album) },
    },
  })
  albums: IAlbum[];

  @ApiProperty({
    example: {
      type: 'array',
      items: { $ref: getSchemaPath(Artist) },
    },
  })
  artists: IArtist[];
}
