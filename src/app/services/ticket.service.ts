import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config-service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  addTicketUrl = this.configservice.workITemsUrl + 'ClassificationNodes/WorkITems'
  GETAREAS:string = 'https://localhost:7022/AzureApi/ClassificationNodes/TicketManagementAreas';
  AddURL:string = 'https://localhost:7290/ClassificationNodes/WorkITems';
  GETURL:string = '';
  GETAPP:string = '';
  constructor(private http:HttpClient,private configservice: AppConfigService) { }

  getArea():Observable<any>{
    return this.http.get(this.GETAREAS);
  }
  getApps():Observable<any>{
    return this.http.get(this.GETAPP);
  }
  addTickit(data:any):Observable<any>{
    return this.http.post(this.addTicketUrl,data);
  }

  getAllTickets():Observable<any>{
    return this.http.get(this.GETURL);
  }
}