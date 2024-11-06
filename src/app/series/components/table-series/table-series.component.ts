import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Serie } from '../../interfaces/series.interface';
import { SerieImagePipe } from '../../pipes/serie-image.pipe';

interface CellContent {
  type: 'image' | 'ratings' | 'button' | 'deleteButton' | 'text';
  content: any;
}

@Component({
  selector: 'app-table-series',
  templateUrl: './table-series.component.html',
  styleUrl: './table-series.component.scss',
})
export class TableSeriesComponent {
  @Input() series: Serie[] = [];
  @Input() columns: { header: string; field: string }[] = [];
  @Input() title!: string;
  @Output() delete = new EventEmitter<Serie>();

  constructor(private serieImagePipe: SerieImagePipe) {}

  /**
   * Returns the content to be displayed in a cell based on the specified field.
   * @param col - The column configuration containing the field identifier.
   * @param serie - The series data item.
   * @param rowIndex - The row index in the table.
   * @returns The content and type for the cell, including image paths, ratings, buttons, or text.
   */
  getCellContent(
    col: { field: string },
    serie: Serie,
    rowIndex: number
  ): CellContent {
    switch (col.field) {
      case 'ranking':
        return {
          type: 'text',
          content: rowIndex + 1,
        };

      case 'caratula':
        return {
          type: 'image',
          content: this.serieImagePipe.transform(serie),
        };

      case 'name':
        return {
          type: 'text',
          content: serie.name,
        };

      case 'streaming':
        return {
          type: 'text',
          content: serie.streaming,
        };

      case 'synopsis':
        return {
          type: 'text',
          content: serie.synopsis,
        };

      case 'averageRating':
        return {
          type: 'text',
          content: serie.averageRating?.toFixed(1),
        };

      case 'ratings':
        return {
          type: 'ratings',
          content: serie.ratings,
        };

      case 'personalRating':
        return {
          type: 'button',
          content: {
            label:
              serie.personalRating !== 0
                ? `${serie.personalRating}`
                : 'Valorar',
            tooltip:
              serie.personalRating !== 0
                ? 'Editar puntuación'
                : 'Añadir puntuación',
            serieId: serie.id,
          },
        };

      case 'actions':
        return {
          type: 'deleteButton',
          content: serie,
        };

      default:
        return {
          type: 'text',
          content: '',
        };
    }
  }

  /**
   * Emits an event to delete the specified series item.
   * @param serie - The series item to be deleted.
   */
  onDelete(serie: Serie) {
    this.delete.emit(serie);
  }
}
