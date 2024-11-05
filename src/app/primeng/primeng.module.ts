import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  exports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DividerModule,
    DropdownModule,
    InputTextareaModule,
    TooltipModule,
    ConfirmDialogModule,
    SidebarModule,
    InputSwitchModule,
    DialogModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class PrimengModule {}
