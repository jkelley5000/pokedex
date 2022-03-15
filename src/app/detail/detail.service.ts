import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class DetailService {
  
  constructor(private http: HttpClient) { }

  getPokemonDetails(name: string) {
    const dataUrl = 'https://pokeapi.co/api/v2/pokemon/' + name;
    return this.http
      .get<any>(dataUrl)
      .pipe(
        catchError(error => {
            let errorMessage: string;
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
            } else {
              errorMessage = this.handleErrors(error);
            }

            return throwError(() => new Error(errorMessage));
        })
      );
  }

  handleErrors(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Pokemon not found: ${error.message}`;
        }
        case 403: {
            return `Temporary access issues, please try again later: ${error.message}`;
        }
        case 500: {
            return `Internal server error, please try again later: ${error.message}`;
        }
        default: {
            return `Unknown server error, please try again later: ${error.message}`;
        }

    }
  }
  
}
