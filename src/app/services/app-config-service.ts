import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(config => {
        this.config = config;
      }); 
  }

  get ipKey(): string {
    return this.config.ipKey;
  }

  get workITemsUrl(): string {
    return `${this.config.ssl}://${this.config.ipKey}:${this.config.workITems}/`;
  }

}
