import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    private endpoint: string = 'https://free.currconv.com/api/v7/convert?q=';
    private apiKey: string = 'b70c61819f27c2e573e2';

    constructor(
        private http: HttpClient) { }

        private extractExchange(res: Response): any {
            const body = res;
            return body || {};
        }

        private extractData(res: Response): any {
            const body = res;
            return body || { };
        }

        private handleError(error: HttpErrorResponse): any {
            if (error.error instanceof ErrorEvent) {
                console.error('An error occurred:', error.error.message);
            } else {
                console.error(
                    `Backend returned code ${error.status}, ` +
                        `body was: ${error.error}`);
            }
            return throwError(
                'Something bad happened; please try again later.');
        }

        getExchangeRate() : Observable<any> {
            return this.http.get(this.endpoint + 'USD_COP&compact=ultra&apiKey=' + this.apiKey);
        }

}
