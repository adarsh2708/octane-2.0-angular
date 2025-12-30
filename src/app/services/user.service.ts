import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserListUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient, private configservice: AppConfigService) { }

   getUserList(): Observable<any> {
    return this.http.get(this.getUserListUrl);
  }
}

