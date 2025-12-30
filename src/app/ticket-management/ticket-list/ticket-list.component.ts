import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets: any[] = [
    {
      id: 1,
      department: 'IT',
      application: 'App1',
      areaPath: 'Area1',
      title: 'Login Issue',
      description: 'Cannot login to app',
      priority: 'High',
      tags: ['login', 'urgent']
    },
    {
      id: 2,
      department: 'HR',
      application: 'App2',
      areaPath: 'Area2',
      title: 'Form Submission',
      description: 'Error on form submit',
      priority: 'Medium',
      tags: ['form', 'error']
    }
  ];

  constructor(private router:Router,private ticketService:TicketService){}

  ngOnInit(): void {
    this.getAllTickets();
  }

  getAllTickets(){
    this.ticketService.getAllTickets().subscribe(
      (res)=>{
        console.log(res);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  addTicket(){
    this.router.navigate(['/add-ticket']);
  }
}
