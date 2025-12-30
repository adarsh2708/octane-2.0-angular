import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from './app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private tokenRefreshedSource = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers.set('SN', 'MUDev');

    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      headers = headers.set('AccessToken', accessToken);
    }

    if (!(req.body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    headers = headers.set('X-Client-URL', window.location.origin);
    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {

          // incase of 2FA, do not attempt to refresh token start
          const currentAccessToken = sessionStorage.getItem('accessToken');
          if (!currentAccessToken) {
            console.warn('No access token found — skipping refresh');
            return next.handle(authReq);
          }
          // incase of 2FA, do not attempt to refresh token end


          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.tokenRefreshedSource.next(null); // reset the subject

            const oldAccessToken = authReq.headers.get('AccessToken') || '';
            const storedData = sessionStorage.getItem('login');
            let refRefreshToken = '';

            if (storedData) {
              const parsedData = JSON.parse(storedData);
              refRefreshToken = parsedData.tokenModel.refreshToken;
            }

            const payload = {
              accessToken: oldAccessToken, // Use the token that triggered 401
              refreshToken: refRefreshToken
            };
            return this.authService.RefreshToken(payload).pipe(
              switchMap((response: any) => {
                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;
                let user_id = '';
                sessionStorage.setItem('accessToken', newAccessToken);

                const loginData = sessionStorage.getItem('login');
                if (loginData) {
                  const parsedData = JSON.parse(loginData);
                  parsedData.tokenModel.accessToken = newAccessToken;
                  parsedData.tokenModel.refreshToken = newRefreshToken;
                  user_id = parsedData.user_id;
                  sessionStorage.setItem('login', JSON.stringify(parsedData));
                }
                const channel = new BroadcastChannel('auth');
                channel.postMessage({ type: 'token_refreshed', token: newAccessToken,refreshToken:newRefreshToken,user_id:user_id });
                this.refreshTokenInProgress = false;
                this.tokenRefreshedSource.next(newAccessToken); // notify others

                const retryReq = req.clone({
                  headers: req.headers.set('AccessToken', newAccessToken)
                });
                return next.handle(retryReq);
              }),
              catchError(refreshError => {
                this.refreshTokenInProgress = false;
                return throwError(refreshError);
              })
            );
          } else {
            // Wait until token is refreshed
            return this.tokenRefreshedSource.pipe(
              filter(token => token != null),
              take(1),
              switchMap((newToken) => {
                const retryReq = req.clone({
                  headers: req.headers.set('AccessToken', newToken!)
                });
                return next.handle(retryReq);
              })
            );
          }
        }

        return throwError(error);
      })
    );
    
  }
}
