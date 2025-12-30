import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-ticket.component.html',
  styleUrls: ['./add-edit-ticket.component.css']
})
export class AddEditTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  tags: string[] = [];
  isTagInvalid: boolean = false;
  departments = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'Finance' }
  ];
  prioritylist = [
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Priority' }
  ];

  applications: { id: number; name: string }[] = [];

  constructor(private fb: FormBuilder, private ticketService: TicketService, private router: Router, private location: Location, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      areaPath: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      priority: ['', Validators.required],
      tags: [''],
      type: ['User Story']
    });
    this.onDepartmentChange('1');

    this.ticketForm.get('department')?.valueChanges.subscribe(dept => {
      this.onDepartmentChange(dept);
    });
  }

  onDepartmentChange(departmentId: string) {
    debugger
    if (departmentId === '1') { // IT
      this.applications = [
        { id: 101, name: 'App1' },
        { id: 102, name: 'App2' }
      ];
    } else if (departmentId === '2') { // HR
      this.applications = [
        { id: 201, name: 'App3' },
        { id: 202, name: 'App4' }
      ];
    } else {
      this.applications = [];
    }
    this.ticketService.getApps().subscribe(
      (res) => {
        // this.applications = res;
      },
      (error) => {

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
    this.toastr.success('Ticket created successfully', 'Success');
    // this.ticketService.addTickit(payload).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.toastr.success('Ticket created successfully', 'Success');
    //     this.navigateToList();
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.toastr.error('Something went wrong', 'Error');
    //   }
    // );
    this.navigateToList();
  }

  navigateToList() {
    this.router.navigate(['/ticket-list']);
  }

  goBack() {
    this.location.back();
  }
}
