/**
 * Unit tests for image service
 * @packageDocumentation
 */

import { ImageService } from './image.service';
import { Image } from './image.model';
import { environment } from '../../environments/environment';


describe('ImageService', () => {
  it('#getImageUrl should return image\'s URL', () => {
    const image: Image = {
      _id: '5e558e05834fb6e13158eb74',
      description: 'This is a mock image for testing.',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    };

    expect(ImageService.getImageUrl(image))
        .toBe(`${environment.baseurl}/images/${image._id}.jpg`);
  });
});
