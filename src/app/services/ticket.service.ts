import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config-service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  // addTicketUrl = this.configservice.workITemsUrl + 'ClassificationNodes/WorkITems'
  // addTicketUrl = this.configservice.workITemsUrl + 'ClassificationNodes/WorkITems'
  // addTicketApps = this.configservice.workITemsUrl + 'ClassificationNodes/TicketManagementAreas'
  addTicketApps = 'https://localhost:7290/ClassificationNodes/TicketManagementAreas';
  GETAREAS:string = '';
  AddURL:string = '';
  GETURL:string = '';
  GETAPP:string = '';
  constructor(private http:HttpClient) { }

  getArea():Observable<any>{
    return this.http.get(this.GETAREAS);
  }
  getApps():Observable<any>{
    return this.http.get(this.addTicketApps);
  }
  addTickit(data:any):Observable<any>{
    return this.http.post('https://localhost:7290/ClassificationNodes/WorkITems',data);
  }

  getAllTickets():Observable<any>{
    return this.http.get(this.GETURL);
  }
}