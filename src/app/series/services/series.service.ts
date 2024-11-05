import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Serie } from '../interfaces/series.interface';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.baseUrl}/series`);
  }

  getSeriesById(id: string): Observable<Serie | undefined> {
    return this.http
      .get<Serie>(`${this.baseUrl}/series/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  addSeries(serie: Serie): Observable<Serie> {
    return this.http.post<Serie>(`${this.baseUrl}/series`, serie);
  }

  updateSerie(serie: Serie): Observable<Serie> {
    if (!serie.id) throw Error('Serie id is required');
    return this.http.patch<Serie>(`${this.baseUrl}/series/${serie.id}`, serie);
  }

  deleteSerieByID(id: string): Observable<boolean> {
    return this.http.delete<Serie>(`${this.baseUrl}/series/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
}
