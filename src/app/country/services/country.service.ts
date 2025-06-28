import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import CountryMapper from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(response => CountryMapper.mapRestCountryArrayToCountryArray(response)),
      catchError(() => {
        return throwError(() => new Error(`No se pudo obtener países con ese query: "${query}"`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return of([]);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(response => CountryMapper.mapRestCountryArrayToCountryArray(response)),
      delay(2000),
      catchError(() => {
        return throwError(() => new Error(`No se pudo obtener países con este query: "${query}"`));
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(response => CountryMapper.mapRestCountryArrayToCountryArray(response)),
      map(countries => countries.at(0)),
      catchError(() => {
        return throwError(() => new Error(`No se pudo obtener el país con este código: "${code}"`));
      })
    );
  }
}
