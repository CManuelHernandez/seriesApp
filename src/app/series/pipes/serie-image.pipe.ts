import { Pipe, PipeTransform } from '@angular/core';
import { Serie } from '../interfaces/series.interface';

@Pipe({
  name: 'serieImage',
})
export class SerieImagePipe implements PipeTransform {
  transform(serie: Serie | undefined): string {
    if (!serie) return 'assets/no-image.jpg';

    if (serie.alt_img === '') {
      return 'assets/no-image.jpg';
    }

    if (serie.alt_img) return serie.alt_img;

    return `assets/series/${serie.alt_img}.jpg`;
  }
}
