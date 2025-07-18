import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import CountryMapper from '../mappers/country.mapper';
import { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(response => CountryMapper.mapRestCountryArrayToCountryArray(response)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(() => {
        return throwError(() => new Error(`No se pudo obtener países con ese query: "${query}"`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(response => CountryMapper.mapRestCountryArrayToCountryArray(response)),
      delay(2000),
      tap(countries => this.queryCacheCountry.set(query, countries)),
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

  searchByRegion(region: Region | null) {
    if (!region) return of([]);
    if (this.queryCacheRegion.has(region)) return of(this.queryCacheRegion.get(region) || []);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map(response => CountryMapper.mapRestCountryArrayToCountryArray(response)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError(() => {
        return throwError(() => new Error(`No se pudo obtener países de la región: "${region}"`));
      })
    );
  }
}
