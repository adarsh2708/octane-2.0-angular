import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = sessionStorage.getItem('accessToken');
  private headers = new HttpHeaders({
    'Authorization' : `${this.token}`
  });
  private options = {
    headers : this.headers,
    withCredentials: true
  };
  constructor(private http: HttpClient, private configservice:AppConfigService) { }

  login(data: any): Observable<any> {
    const loginUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/LoginManager/Login';
    return this.http.post(loginUrl, data);
  }
  logout(): Observable<any> {
    const logoutUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/LoginManager/Logout';
    return this.http.get(logoutUrl, this.options);
  }
  loginAuthenticationFactor(payload: any): Observable<any> {
    const twoAuthenticationFactorLoginUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/TwoFA/Login';
    return this.http.post(twoAuthenticationFactorLoginUrl, payload);
  }
  TwoFaUserList(email: string): Observable<any> {
    const TwoFaUserListUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/TwoFA/UsersList';
    const params = new HttpParams()
      .set('email', email.toString())
    return this.http.get(TwoFaUserListUrl, { params });
  }
  userLoginInfo(data: any): Observable<any> {
    const userLoginInfoUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/TwoFA/UserLoginInfo';
    return this.http.post(userLoginInfoUrl, data);
  }

  verifyUserId(userId: string): Observable<any> {

    const verifyUserIdUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/LoginManager/ValidateUserId'
    const payload = {
      userId: userId
    }
    return this.http.post(verifyUserIdUrl, payload);
  }
  forgotPassword(data: any): Observable<any> {
    const forgotPasswordUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/LoginManager/SendEmailForgotPassword'
    return this.http.post(forgotPasswordUrl, data);
  }
  confirmPassword(data: any): Observable<any> {
    const confirmPasswordUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/LoginManager/ResetPassword'
    return this.http.post(confirmPasswordUrl, data);
  }
  authCodeSignUp(data: any): Observable<any> {
    const authCodeSignUpUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/SignUpManager/ValidateAuthCode'
    return this.http.post(authCodeSignUpUrl, data);
  }

  signUp(data: any): Observable<any> {
    const signUpUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/SignUpManager/SignUpByAuthCode'
    return this.http.post(signUpUrl, data);
  }
  captcha(): Observable<any> {
    const captchaUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/CaptchaManager/GetSignUpCaptcha'
    return this.http.get(captchaUrl);
  }

  ValidateForgotPasswordCode(data: any): Observable<any> {
    const validateForgotPasswordCode = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/LoginManager/ValidateForgotPasswordCode'
    return this.http.post(validateForgotPasswordCode, data);
  }


  RefreshToken(data: any): Observable<any> {
    const refreshTokenUrl = this.configservice.loginApiUrl + 'AuthenticationGatewayApi/LoginManager/RefreshToken'
    return this.http.post(refreshTokenUrl, data);
  }
  valiadtionCradentialForDiffrentProject(userId:any,password:any): Observable<any> {
     const data = {
    userId: userId,
    password: password
  };

    const uWorkListUrl = this.configservice.cradentialforProjectUrl + 'UWorkListAuthenticationApi/AuthenticationCreds/Validate';
    return this.http.post(uWorkListUrl,data);
  }
   valiadtionCradentialForPracticeManagerProject(userId:any,password:any): Observable<any> {
     const data = {
    userId: userId,
    password: password
  };

    const valiadtionCradentialForPracticeManagerProjectUrl = this.configservice.practiceManagerProject + 'UPrtcMgrAuthenticationApi/AuthenticationCreds/Validate';
    return this.http.post(valiadtionCradentialForPracticeManagerProjectUrl,data);
  }

}
