import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SeriesService } from './series.service';
import { Serie, StreamingPlataform } from '../interfaces/series.interface';
import { environments } from '../../../environments/environments';
import { CardSeriesComponent } from '../components/card-series/card-series.component';
import { SerieImagePipe } from '../pipes/serie-image.pipe';

describe('SeriesService', () => {
  let service: SeriesService;
  let httpMock: HttpTestingController;
  const baseUrl = environments.baseUrl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CardSeriesComponent, SerieImagePipe],
      providers: [SeriesService],
    }).compileComponents();

    service = TestBed.inject(SeriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSeries', () => {
    it('should return an array of series', () => {
      const mockSeries: Serie[] = [
        {
          id: 1,
          name: 'Series 1',
          streaming: StreamingPlataform.Netflix,
          personalRating: 4,
          ratings: [],
          synopsis: 'Synopsis 1',
        },
        {
          id: 2,
          name: 'Series 2',
          streaming: StreamingPlataform.Prime,
          personalRating: 5,
          ratings: [],
          synopsis: 'Synopsis 2',
        },
      ];

      service.getSeries().subscribe((series) => {
        expect(series.length).toBe(2);
        expect(series).toEqual(mockSeries);
      });

      const req = httpMock.expectOne(`${baseUrl}/series`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSeries);
    });
  });

  describe('getSeriesById', () => {
    it('should return a single series by id', () => {
      const mockSerie: Serie = {
        id: 1,
        name: 'Series 1',
        streaming: StreamingPlataform.Netflix,
        personalRating: 4,
        ratings: [],
        synopsis: 'Synopsis 1',
      };

      service.getSeriesById('1').subscribe((serie) => {
        expect(serie).toEqual(mockSerie);
      });

      const req = httpMock.expectOne(`${baseUrl}/series/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSerie);
    });

    it('should return undefined if series not found', () => {
      service.getSeriesById('non-existent-id').subscribe((serie) => {
        expect(serie).toBeUndefined();
      });

      const req = httpMock.expectOne(`${baseUrl}/series/non-existent-id`);
      expect(req.request.method).toBe('GET');
      req.flush({}, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addSeries', () => {
    it('should add a new series', () => {
      const newSerie: Serie = {
        id: 3,
        name: 'Series 3',
        streaming: StreamingPlataform.Disney,
        personalRating: 4,
        ratings: [],
        synopsis: 'Synopsis 3',
      };

      service.addSeries(newSerie).subscribe((serie) => {
        expect(serie).toEqual(newSerie);
      });

      const req = httpMock.expectOne(`${baseUrl}/series`);
      expect(req.request.method).toBe('POST');
      req.flush(newSerie);
    });
  });

  describe('updateSerie', () => {
    it('should update a series', () => {
      const updatedSerie: Serie = {
        id: 1,
        name: 'Updated Series 1',
        streaming: StreamingPlataform.Netflix,
        personalRating: 5,
        ratings: [],
        synopsis: 'Updated Synopsis 1',
      };

      service.updateSerie(updatedSerie).subscribe((serie) => {
        expect(serie).toEqual(updatedSerie);
      });

      const req = httpMock.expectOne(`${baseUrl}/series/1`);
      expect(req.request.method).toBe('PATCH');
      req.flush(updatedSerie);
    });

    it('should throw an error if no id is provided', () => {
      const updatedSerie: Serie = {
        id: 0,
        name: 'Updated Series',
        streaming: StreamingPlataform.Prime,
        personalRating: 4,
        ratings: [],
        synopsis: 'Synopsis',
      };

      expect(() => service.updateSerie(updatedSerie)).toThrowError(
        'Serie id is required'
      );
    });
  });

  describe('deleteSerieByID', () => {
    it('should delete a series by id and return true', () => {
      service.deleteSerieByID('1').subscribe((result) => {
        expect(result).toBe(true);
      });

      const req = httpMock.expectOne(`${baseUrl}/series/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should return false if deletion fails', () => {
      service.deleteSerieByID('non-existent-id').subscribe((result) => {
        expect(result).toBe(false);
      });

      const req = httpMock.expectOne(`${baseUrl}/series/non-existent-id`);
      expect(req.request.method).toBe('DELETE');
      req.flush({}, { status: 404, statusText: 'Not Found' });
    });
  });
});
