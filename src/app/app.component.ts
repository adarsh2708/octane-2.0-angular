import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'octane-2.0-angular';

  constructor(private router:Router){}

   isLoginPage(): boolean {
    const url = this.router.url;
    return url === '/' || url.includes('/TwoFA') || url.includes('/error-page') || url.includes('/forgotpassword') 
    || url.includes('/signUp') || url.includes('/verification-code') || url.includes('/verfication-verfied');
  }

  ngOnInit(): void {
    
  }

}
