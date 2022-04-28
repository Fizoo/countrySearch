import {Component, OnInit} from '@angular/core';
import {CountryServiceService, ICountry} from './country-service.service';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap, tap} from "rxjs";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  value=new FormControl();
  loading:boolean = false
  countries$?:Observable<ICountry[]>
  res:ICountry[]=[]
  private searchTerms$=new Subject<string>();

  constructor(private countryService:CountryServiceService) {
    this.countries$= this.value.valueChanges.pipe(
      tap((_)=>this.loading=true),
      debounceTime(300),
      distinctUntilChanged(),
      tap(a=>this.searchTerms$.next(a)),
      switchMap((term:string) => this.countryService.searchCountry(term)),
      tap((_)=>this.loading=false)
     )}




}
