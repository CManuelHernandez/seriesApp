import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { SeriesService } from '../../services/series.service';
import { Serie } from '../../interfaces/series.interface';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tableColumns, title } from './list-table.config';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit, OnDestroy {
  public series: Serie[] = [];
  userLoged?: string;
  user?: User | null;
  private userSubscription: Subscription = new Subscription();

  public listColumns = tableColumns;
  public title = title;

  constructor(
    private authService: AuthService,
    private seriesService: SeriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userLoged = sessionStorage.getItem('email') || '';
    this.authService.fetchLoggedInUser(this.userLoged);

    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.geSeriesFromServer();
  }

  geSeriesFromServer(): void {
    this.seriesService.getSeries().subscribe((serie) => {
      this.series = serie.map((serie) => {
        const userRating = serie.ratings.find(
          (rating) => rating.id === Number(this.user?.id)
        );

        if (userRating) {
          serie.personalRating = userRating.rating;
        }

        return serie;
      });

      this.series.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  deleteSerie(serie: Serie): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas proceder con la eliminación de "${serie.name}"?`,
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.seriesService
          .deleteSerieByID(serie.id.toString())
          .subscribe((success: any) => {
            if (success) {
              this.series = this.series.filter((f) => f.id !== serie.id);
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmado',
                detail: `Serie "${serie.name}" eliminada`,
              });
            } else {
              console.error('Error al eliminar la serie');
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `No se pudo eliminar la serie "${serie.name}"`,
              });
            }
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rechazado',
          detail: `No se borró la serie "${serie.name}"`,
          life: 3000,
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
