import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AddEditTicketComponent } from './add-edit-ticket/add-edit-ticket.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    TicketListComponent,
    AddEditTicketComponent,
    TicketModalComponent,
    TicketDialogComponent
  ],
  imports: [
    TicketManagementRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class TicketManagementModule { }
