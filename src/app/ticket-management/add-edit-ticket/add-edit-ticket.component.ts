import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-ticket.component.html',
  styleUrls: ['./add-edit-ticket.component.css']
})
export class AddEditTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  tags: string[] = [];
  isTagInvalid: boolean = false;
  selectedTicketId: string | undefined;
  modalVisible = false;
  departments = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'Finance' }
  ];
  prioritylist = [
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' }
  ];

  applications: { id: number; name: string }[] = [];

  constructor(private fb: FormBuilder,private dialog: MatDialog,private ticketService: TicketService, private router: Router, private location: Location, private toastr: ToastrService,private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      areaPath: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      priority: ['', Validators.required],
      tags: [''],
      type: ['User Story']
    });
    this.getDepartment();

    this.ticketForm.get('department')?.valueChanges.subscribe(dept => {
      // this.onDepartmentChange(dept);
    });
  }

  getDepartment() {
    this.ticketService.getApps().subscribe(
      (res) => {
        this.applications = res;
      },
      (error) => {
        this.applications = [];
      }
    );
  }

  addTag(event: any) {
    event.preventDefault();

    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }

    input.value = '';
    this.isTagInvalid = this.tags.length === 0;
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  submit() {
    this.isTagInvalid = this.tags.length === 0;

    // validate form
    if (this.ticketForm.invalid || this.isTagInvalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    console.log('Ticket Data:', this.ticketForm.value);
    console.log('Ticket Data:', JSON.stringify(this.ticketForm.value));
    let model = this.ticketForm.value;
    const payload = {
      ...this.ticketForm.value,
      priority: parseInt(model.priority),
      description: model.description?.substring(0, 500),
      tags: this.tags.join(';')
    };
    console.log(JSON.stringify(payload));
    this.ticketService.addTickit(payload).subscribe(
      (res) => {
        const ticketId = res?.id;
        const dialogRef = this.dialog.open(TicketDialogComponent, {
    width: '300px',
    data: { ticketId }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'ok') {
      console.log('User clicked OK');
    } else if (result === 'cancel') {
      console.log('User clicked Cancel');
    }
  });
     },
      (error) => {
        console.log(error);
        this.toastr.error('Something went wrong', 'Error');
      }
    );
  }

  navigateToList() {
    this.router.navigate(['/ticket-list']);
  }

  goBack() {
    this.location.back();
  }

  onOk() {
    this.modalVisible = false;
}

onCancel() {
    this.modalVisible = false;
}
}
