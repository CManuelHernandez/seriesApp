import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { RankedListPageComponent } from './pages/ranked-list-page/ranked-list-page.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    RankedListPageComponent,
  ],
  imports: [CommonModule, SeriesRoutingModule, PrimengModule, FormsModule],
})
export class SeriesModule {}
