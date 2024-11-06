import { Pipe, PipeTransform } from '@angular/core';
import { Serie } from '../interfaces/series.interface';

@Pipe({
  name: 'serieImage',
})
export class SerieImagePipe implements PipeTransform {
  /**
   * Transforms the serie object to return the appropriate image path.
   * If the series does not have an image, returns a default "no-image.jpg".
   * @param serie - The serie object containing the image or image URL.
   * @returns A string representing the path to the image file.
   */
  transform(serie: Serie | undefined): string {
    if (!serie) return 'assets/no-image.jpg';

    if (serie.alt_img === '') {
      return 'assets/no-image.jpg';
    }

    if (serie.alt_img) return serie.alt_img;

    return `assets/series/${serie.alt_img}.jpg`;
  }
}
