import { Component, OnInit } from '@angular/core';
import { Serie } from '../../interfaces/series.interface';
import { SeriesService } from '../../services/series.service';
import { tableColumns, title } from './ranked-table.config';
@Component({
  selector: 'app-ranked-list-page',
  templateUrl: './ranked-list-page.component.html',
  styleUrl: './ranked-list-page.component.scss',
})
export class RankedListPageComponent implements OnInit {
  public series: Serie[] = [];

  public rankedColumns = tableColumns;
  public title = title;

  constructor(private seriesService: SeriesService) {}

  /**
   * Initializes the component by fetching series data from the server.
   */
  ngOnInit(): void {
    this.geSeriesFromServer();
  }

  /**
   * Fetches series data from the server and processes it by calculating the average rating
   * for each series and sorting them by this rating in descending order.
   */
  geSeriesFromServer(): void {
    this.seriesService.getSeries().subscribe((serie) => {
      this.series = serie
        .map((serie) => {
          serie.averageRating = this.calculateAverageRating(serie.ratings) ?? 0;
          return serie;
        })
        .sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
    });
  }

  /**
   * Calculates the average rating of a series based on its ratings.
   * @param ratings - The list of ratings for the series.
   * @returns The average rating or 0 if no ratings are provided.
   */
  calculateAverageRating(ratings: { rating: number }[]): number {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return total / ratings.length;
  }
}
