import React from 'react';

import Artist from '../Artist';

const PLACEHOLDER_IMAGE = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png';

export default class Util {
    static getArtists (artists) {
    const array = artists.items.filter((item) => {
      let square_image_array = item.images.filter((img) => {
        return img.height === img.width;
      });

      return square_image_array.length > 0;
    });

    return array.map((item) => {
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
