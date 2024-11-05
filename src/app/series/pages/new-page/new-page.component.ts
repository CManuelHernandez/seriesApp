import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Serie, StreamingPlataform } from '../../interfaces/series.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Subscription, switchMap } from 'rxjs';
import { SeriesService } from '../../services/series.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.scss',
})
export class NewPageComponent implements OnInit, OnDestroy {
  serieForm!: FormGroup;
  public streamingPlatforms: Array<{ id: StreamingPlataform; desc: string }>;
  user?: User | null;
  editSerie?: Serie;
  isEditMode!: boolean;
  private userSubscription: Subscription = new Subscription();

  helpVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private seriesService: SeriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private msgService: MessageService,
    private location: Location
  ) {
    this.streamingPlatforms = this.getStreamingPlatforms();
  }

  ngOnInit(): void {
    this.isEditMode = this.router.url.includes('edit');

    if (this.isEditMode) {
      this.initEditForm();
    } else {
      this.initCreateForm();
    }

    const userLoged = sessionStorage.getItem('email') || '';
    this.authService.fetchLoggedInUser(userLoged);

    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    if (this.isEditMode) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.seriesService.getSeriesById(id)))
        .subscribe((serie) => {
          if (!serie) return this.router.navigateByUrl('/');

          this.editSerie = serie;

          const userRating = serie.ratings.find(
            (rating) => rating.email === this.user?.email
          );

          this.serieForm.patchValue({
            ...serie,
            streaming: serie.streaming,
            ratings: userRating ? userRating.rating : 0,
          });
          return;
        });
    }
  }

  private initCreateForm(): void {
    this.serieForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      streaming: ['', Validators.required],
      synopsis: ['', [Validators.required, Validators.minLength(3)]],
      ratings: [
        null,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      alt_img: [''],
    });
  }

  private initEditForm(): void {
    this.serieForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      streaming: [{ value: '', disabled: true }, Validators.required],
      synopsis: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      ratings: [
        0,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      alt_img: [{ value: '', disabled: true }],
    });
  }

  get currentSerie(): Serie {
    return this.serieForm.value;
  }

  private getStreamingPlatforms(): Array<{
    id: StreamingPlataform;
    desc: string;
  }> {
    return Object.entries(StreamingPlataform).map(([key, value]) => ({
      id: value,
      desc: value,
    }));
  }

  onSubmit(): void {
    if (this.serieForm.invalid || !this.user) return;

    const ratings = {
      fullName: this.user.fullName,
      email: this.user.email,
      rating: this.serieForm.value.ratings,
      id: this.user.id,
    };

    const serieData = {
      ...this.serieForm.getRawValue(),
      personalRating: 0,
      ratings: [ratings],
    };

    if (this.editSerie) {
      this.editSerie.ratings.forEach((rating) => {
        serieData.ratings.push(rating);
      });

      const seenIds = new Set();
      serieData.ratings = serieData.ratings.filter(
        (rating: any, index: any) => {
          if (seenIds.has(rating.id)) {
            return index === 0;
          } else {
            seenIds.add(rating.id);
            return true;
          }
        }
      );

      this.seriesService.updateSerie(serieData).subscribe(({ name }) => {
        this.router.navigate(['/series/list']);
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Puntuación de la serie ${name} actualizada con éxito`,
        });
      });

      return;
    }
    this.seriesService.addSeries(serieData).subscribe(({ name }) => {
      this.router.navigate(['/series/list']);
      this.msgService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Nueva serie ${name} creada con éxito`,
      });
    });
  }

  isValidField(fieldName: string): boolean {
    const field = this.serieForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  onBack(): void {
    this.location.back();
  }

  showHelp() {
    this.helpVisible = true;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
