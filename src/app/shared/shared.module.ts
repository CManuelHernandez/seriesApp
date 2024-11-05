import { NgModule } from '@angular/core';
import { Error404PageComponent } from './error404-page/error404-page.component';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [Error404PageComponent],
  exports: [Error404PageComponent],
  imports: [AppRoutingModule, ButtonModule],
})
export class SharedModule {}
