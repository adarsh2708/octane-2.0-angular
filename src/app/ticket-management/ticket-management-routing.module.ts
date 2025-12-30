import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AddEditTicketComponent } from './add-edit-ticket/add-edit-ticket.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'ticket-list',
    pathMatch:'full'
    },
  {
    path:'ticket-list',
    component:TicketListComponent
  },
  {
    path:'add-ticket',
    component:AddEditTicketComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketManagementRoutingModule { }
