import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { RankedListPageComponent } from './pages/ranked-list-page/ranked-list-page.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardSeriesComponent } from './components/card-series/card-series.component';
import { ImagenHelperComponent } from './components/imagen-helper/imagen-helper.component';
import { TableSeriesComponent } from './components/table-series/table-series.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { SerieImagePipe } from './pipes/serie-image.pipe';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SerieImagePipe,
    RankedListPageComponent,
    SidebarComponent,
    CardSeriesComponent,
    ImagenHelperComponent,
    TableSeriesComponent,
    NoDataComponent,
  ],
  imports: [CommonModule, SeriesRoutingModule, PrimengModule, FormsModule],
  providers: [SerieImagePipe],
})
export class SeriesModule {}
