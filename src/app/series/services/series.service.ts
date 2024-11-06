import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Serie } from '../interfaces/series.interface';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetches all series from the server.
   * @returns An Observable that emits a list of series.
   */
  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.baseUrl}/series`);
  }

  /**
   * Fetches a series by its ID.
   * @param id - The ID of the series to retrieve.
   * @returns An Observable that emits the series if found, otherwise undefined.
   */
  getSeriesById(id: string): Observable<Serie | undefined> {
    return this.http
      .get<Serie>(`${this.baseUrl}/series/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  /**
   * Adds a new series to the server.
   * @param serie - The series object to add.
   * @returns An Observable that emits the added series.
   */
  addSeries(serie: Serie): Observable<Serie> {
    return this.http.post<Serie>(`${this.baseUrl}/series`, serie);
  }

  /**
   * Updates an existing series on the server.
   * @param serie - The series object with updated information.
   * @returns An Observable that emits the updated series.
   * @throws An error if the series ID is missing.
   */
  updateSerie(serie: Serie): Observable<Serie> {
    if (!serie.id) throw Error('Serie id is required');
    return this.http.patch<Serie>(`${this.baseUrl}/series/${serie.id}`, serie);
  }

  /**
   * Deletes a series by its ID.
   * @param id - The ID of the series to delete.
   * @returns An Observable that emits `true` if the deletion was successful, otherwise `false`.
   */
  deleteSerieByID(id: string): Observable<boolean> {
    return this.http.delete<Serie>(`${this.baseUrl}/series/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
}
