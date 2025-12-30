import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent {
constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: string }
  ) {}

  copy() {
    navigator.clipboard.writeText(this.data.ticketId).then(() => {
      alert('Ticket ID copied!');
    });
  }

  ok() {
    this.dialogRef.close('ok');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
