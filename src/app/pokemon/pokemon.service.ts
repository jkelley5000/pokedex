import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Pokemon } from './pokemon.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) { }

  dataUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';

  getPokemonPaginated(offset: number) {
    const dataUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=' + offset.toString() + '0';
    return this.http
      .get<Pokemon>(dataUrl)
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

  getAllPokemon() {
    const allDataUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000';
    return this.http
      .get<Pokemon>(allDataUrl)
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
