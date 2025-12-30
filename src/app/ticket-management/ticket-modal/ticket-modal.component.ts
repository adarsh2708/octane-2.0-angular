import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css']
})
export class TicketModalComponent {
@Input() ticketId: string | undefined;
  @Input() visible = false;

  @Output() okClick = new EventEmitter<void>();
  @Output() cancelClick = new EventEmitter<void>();

  copy(input: HTMLInputElement) {
    input.select();
    document.execCommand('copy');
    alert('Ticket ID copied!');
  }

  ok() {
    this.visible = false;
    this.okClick.emit();
  }

  cancel() {
    this.visible = false;
    this.cancelClick.emit();
  }
}