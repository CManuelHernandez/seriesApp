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

  getRatingLabel(serie: Serie): string {
    return serie.personalRating !== 0 ? `${serie.personalRating}` : 'Valorar';
  }

  getRatingTooltip(serie: Serie): string {
    return serie.personalRating !== 0
      ? 'Editar puntuación'
      : 'Añadir puntuación';
  }

  shouldShowField(field: string): boolean {
    return this.columns.some((col) => col.field === field);
  }

  onDelete(serie: Serie, event: Event) {
    event.stopPropagation();
    this.delete.emit(serie);
  }

  onRate(serie: Serie) {
    this.rate.emit(serie);
  }
}
