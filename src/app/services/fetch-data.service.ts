import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

const apiUrl: string = 'http://localhost:1337';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is: ${error.message}`
      );
    }
    return throwError(() => new Error());
  }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post('http://localhost:1337/api/auth/local/register', {
        username: userDetails.Username,
        password: userDetails.Password,
        email: userDetails.Email,
      })
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post(
        'http://localhost:1337/api/auth/local',
        {
          identifier: userDetails.Username,
          password: userDetails.Password,
        },
        headers
      )
      .pipe(catchError(this.handleError));
  }

  public getAllKriptos(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    };
    return this.http
      .get(`${apiUrl}/api/kriptos?populate=*`, headers)
      .pipe(catchError(this.handleError));
  }
}
