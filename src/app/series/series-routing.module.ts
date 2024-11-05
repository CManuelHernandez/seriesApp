import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { RankedListPageComponent } from './pages/ranked-list-page/ranked-list-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'new-serie',
        component: NewPageComponent,
      },
      {
        path: 'top-series',
        component: RankedListPageComponent,
      },
      {
        path: 'edit/:id',
        component: NewPageComponent,
      },
      {
        path: 'list',
        component: ListPageComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesRoutingModule {}
