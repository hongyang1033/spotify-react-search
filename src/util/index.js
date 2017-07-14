import React from 'react';

import Artist from '../Artist';

const PLACEHOLDER_IMAGE = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png';

export default class Util {
    static getArtists (artists) {
      const artist = artists.items.filter((item) => {
        return item.images.height === item.images.width;
      });

    return artist.map((item) => {
      const image = item.images[0];

      const image_url = image ? image.url : PLACEHOLDER_IMAGE;

      return <Artist
        image={image_url}
        name={item.name}
        key={item.id}
      />
    });
  }
}
