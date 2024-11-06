import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Serie } from '../../interfaces/series.interface';
import { SerieImagePipe } from '../../pipes/serie-image.pipe';

interface Column {
  header: string;
  field: string;
}

interface CellContent {
  type: 'image' | 'ratings' | 'button' | 'deleteButton' | 'text';
  content: any;
}

@Component({
  selector: 'app-card-series',
  templateUrl: './card-series.component.html',
  styleUrl: './card-series.component.scss',
})
export class CardSeriesComponent {
  @Input() series: Serie[] = [];
  @Input() columns: Column[] = [];
  @Input() title!: string;
  @Output() delete = new EventEmitter<Serie>();
  @Output() rate = new EventEmitter<Serie>();

  constructor(private serieImagePipe: SerieImagePipe) {}

  /**
   * Retrieves the content for a specific field in a Serie item.
   * Uses the `SerieImagePipe` for images and returns values depending on field type.
   * @param field - The name of the field to retrieve from the Serie object.
   * @param serie - The current Serie object.
   * @param rowIndex - The index of the current row, used for ranking.
   * @returns Content for display based on the field type.
   */
  getContentByField(field: string, serie: Serie, rowIndex: number): any {
    switch (field) {
      case 'ranking':
        return rowIndex + 1;

      case 'caratula':
        return this.serieImagePipe.transform(serie);

      case 'name':
        return serie.name;

      case 'streaming':
        return serie.streaming;

      case 'synopsis':
        return serie.synopsis;

      case 'averageRating':
        return serie.averageRating?.toFixed(1);

      case 'ratings':
        return serie.ratings;

      default:
        return '';
    }
  }

  /**
   * Retrieves the rating label for the Serie item.
   * Returns the user's personal rating if set, otherwise defaults to "Valorar".
   * @param serie - The Serie object for which the rating label is being generated.
   * @returns A string showing either the user's rating or a default text.
   */
  getRatingLabel(serie: Serie): string {
    return serie.personalRating !== 0 ? `${serie.personalRating}` : 'Valorar';
  }

  /**
   * Provides a tooltip for the rating button depending on if the user has rated the Serie.
   * @param serie - The Serie object to display the tooltip for.
   * @returns A tooltip string indicating "Editar puntuación" or "Añadir puntuación".
   */
  getRatingTooltip(serie: Serie): string {
    return serie.personalRating !== 0
      ? 'Editar puntuación'
      : 'Añadir puntuación';
  }

  /**
   * Checks if a given field should be displayed based on the configured columns.
   * @param field - The name of the field to check visibility.
   * @returns `true` if the field should be shown, `false` otherwise.
   */
  shouldShowField(field: string): boolean {
    return this.columns.some((col) => col.field === field);
  }

  /**
   * Emits the delete event for the specified Serie item.
   * Prevents the click event from propagating further.
   * @param serie - The Serie object to delete.
   * @param event - The click event, which is stopped from propagation.
   */
  onDelete(serie: Serie, event: Event) {
    event.stopPropagation();
    this.delete.emit(serie);
  }

  /**
   * Emits the rate event for the specified Serie item to allow user rating.
   * @param serie - The Serie object to rate.
   */
  onRate(serie: Serie) {
    this.rate.emit(serie);
  }
}
