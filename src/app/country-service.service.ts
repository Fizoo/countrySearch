import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of, tap} from "rxjs";

export interface ICountry {
  name: {
    common:string
  },
  flags: {
    png:string
  }
}


@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  url: string = 'https://restcountries.com/v3.1/name/'

  constructor(private http: HttpClient) {
  }

  public searchCountry(term: string): Observable<ICountry[]> {
    let newUrl = `${this.url}${term}`
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<ICountry[]>(newUrl)
  }

}
